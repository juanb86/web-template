import { env } from "~/env.mjs";
import { createPostSchema } from "~/schemas/post.schema";
import {
  createTRPCRouter,
  protectedProcedure,
  publicProcedure,
} from "~/server/api/trpc";

export const postsRouter = createTRPCRouter({
  getAll: publicProcedure.query(({ ctx }) => {
    const posts = ctx.prisma.post.findMany({
      include: {
        author: true, // Include author details
      },
    });

    return posts;
  }),

  create: protectedProcedure
    .input(createPostSchema)
    .mutation(async ({ ctx, input }) => {
      const authorId = ctx.session.user.id;

      const post = await ctx.prisma.post.create({
        data: {
          title: input.title,
          description: input.description,
          imageURL: input.imageURL,
          authorId,
        },
      });

      return post;
    }),

  cloudinary: protectedProcedure.query(() => {
    const preset = env.CLOUDINARY_PRESET;
    const cloud = env.CLOUDINARY_CLOUD;

    return {
      preset,
      cloud,
    };
  }),
});
