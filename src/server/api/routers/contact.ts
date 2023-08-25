import { contactSchemaWithToken } from "~/schemas/contact.schema";
import { createTRPCRouter, publicProcedure } from "~/server/api/trpc";
import * as nodemailer from "nodemailer";
import { TRPCError } from "@trpc/server";
import { env } from "process";
import { fetchData } from "~/utils/front";

interface FetchRecaptchaI {
  data?: RecaptchaResponseData;
  error?: {
    status: number;
    message: string;
  };
}

interface RecaptchaResponseData {
  success: boolean; // whether this request was a valid reCAPTCHA token for your site
  score: number; // the score for this request (0.0 - 1.0)
  action: string; // the action name for this request (important to verify)
  challenge_ts: string; // timestamp of the challenge load (ISO format yyyy-MM-dd'T'HH:mm:ssZZ)
  hostname: string; // the hostname of the site where the reCAPTCHA was solved
  ["error-codes"]: unknown; // optional
}

export async function fetchRecaptcha({
  token,
}: {
  token: string;
}): Promise<FetchRecaptchaI> {
  const secretKey = env.RECAPTCHA_SECRET_KEY || "";

  const verificationUrl =
    "https://www.google.com/recaptcha/api/siteverify?secret=" +
    secretKey +
    "&response=" +
    token;

  const response = await fetchData<RecaptchaResponseData>(verificationUrl, {
    method: "POST",
  });

  if (response.ok === false || !response.bodyJson) {
    return { error: { status: response.status, message: response.statusText } };
  } else {
    return { data: response.bodyJson };
  }
}

export const contactRouter = createTRPCRouter({
  send: publicProcedure
    .input(contactSchemaWithToken)
    .mutation(async ({ input }) => {
      const recaptchaResponse = await fetchRecaptcha({
        token: input.token,
      });

      if (
        !recaptchaResponse.data ||
        recaptchaResponse.data.success === false ||
        recaptchaResponse.data.score < 0.5
      ) {
        throw new TRPCError({
          code: "INTERNAL_SERVER_ERROR",
          message: "Something went wrong with reCAPTCHA",
        });
      }

      const transporter = nodemailer.createTransport({
        service: "Brevo",
        auth: {
          user: process.env.BREVO_USER,
          pass: process.env.BREVO_PASS,
        },
        secure: false,
      });

      const mailData = {
        from: process.env.EMAIL_TO,
        to: process.env.EMAIL_TO,
        subject: `Message from ${input.name} trough webtemplate`,
        text: `Name: ${input.name}, Company: ${input.company || ""}, Phone: ${
          input.phone
        }, Email: ${input.email}, Subject: ${input.subject}, Message: ${
          input.message
        }`,
        html: `<div style="font-family: Arial, sans-serif;">
      <h1>Message from ${input.name} trough webtemplate</h1>
      <p><strong>Name:</strong> ${input.name}</p>
      <p><strong>Company:</strong> ${input.company || "N/A"}</p>
      <p><strong>Phone:</strong> ${input.phone}</p>
      <p><strong>Email:</strong> <a href="mailto:${input.email}">${
          input.email
        }</a></p>
      <p><strong>Subject:</strong> ${input.subject}</p>
      <p><strong>Message:</strong> ${input.message}</p>
      </div>`,
      };

      const deliveryInfo = await transporter.sendMail(mailData);

      if (!deliveryInfo?.accepted) {
        console.log("EMAIL DELIVERY FAILED");

        throw new TRPCError({
          code: "INTERNAL_SERVER_ERROR",
          message: "Something went wrong with email delivery",
        });
      }
    }),
});
