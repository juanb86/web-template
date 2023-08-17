import z from "zod";

export const contactSchema = z.object({
  name: z.string().nonempty(),
  company: z.string().optional(),
  phone: z.string().regex(/^\+?\d{10,15}$/),
  email: z.string().email(),
  subject: z.string().nonempty(),
  message: z.string().nonempty(),
});

export type ContactInput = z.infer<typeof contactSchema>;
