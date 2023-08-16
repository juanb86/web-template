import z from "zod";

export const getSinglePostSchema = z.object({ id: z.string() });

export const createPostSchema = z.object({
  title: z.string().min(1).max(256),
  description: z.string().min(10),
  imageURL: z.string().url(),
});

export type CreatePostInput = z.TypeOf<typeof createPostSchema>;

export const updatePostSchema = z.object({
  title: z.string().min(1).max(256),
  description: z.string().min(10),
  imageURL: z.string().url(),
  id: z.string(),
});

export type UpdatePostInput = z.TypeOf<typeof updatePostSchema>;
