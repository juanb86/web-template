import { contactSchema } from "~/schemas/contact.schema";
import { createTRPCRouter, publicProcedure } from "~/server/api/trpc";
import * as nodemailer from "nodemailer";
import { TRPCError } from "@trpc/server";

export const contactRouter = createTRPCRouter({
  send: publicProcedure.input(contactSchema).mutation(async ({ input }) => {
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

    console.log(deliveryInfo);

    if (!deliveryInfo?.accepted) {
      console.log("EMAIL DELIVERY FAILED");

      throw new TRPCError({
        code: "INTERNAL_SERVER_ERROR",
        message: "Something went wrong with email delivery",
      });
    }
  }),
});
