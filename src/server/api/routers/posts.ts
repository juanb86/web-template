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
});
