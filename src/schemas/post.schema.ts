import z from "zod";

export const createPostSchema = z.object({
  title: z.string().min(1).max(256),
  description: z.string().min(10),
  imageURL: z.string().url(),
});

export type CreatePostInput = z.TypeOf<typeof createPostSchema>;

export const getSinglePostSchema = z.object({ id: z.string() });
