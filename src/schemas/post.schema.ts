import z from "zod";

export const createPostSchema = z.object({
  title: z.string().max(256),
  description: z.string().min(10),
  imageURL: z.string(),
});

export type CreatePostInput = z.TypeOf<typeof createPostSchema>;
