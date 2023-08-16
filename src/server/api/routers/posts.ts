import { TRPCError } from "@trpc/server";
import { env } from "~/env.mjs";
import {
  createPostSchema,
  getSinglePostSchema,
  updatePostSchema,
} from "~/schemas/post.schema";
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

  update: protectedProcedure
    .input(updatePostSchema)
    .mutation(async ({ ctx, input }) => {
      const authorId = ctx.session.user.id;

      const post = await ctx.prisma.post.update({
        where: {
          id: input.id,
        },
        data: {
          title: input.title,
          description: input.description,
          imageURL: input.imageURL,
          authorId,
        },
      });

      return post;
    }),

  delete: protectedProcedure
    .input(getSinglePostSchema)
    .mutation(async ({ ctx, input }) => {
      const post = await ctx.prisma.post.findUnique({
        where: { id: input.id },
      });

      if (!post)
        throw new TRPCError({
          code: "INTERNAL_SERVER_ERROR",
          message: "Post to delete not found",
        });

      await ctx.prisma.post.delete({
        where: {
          id: input.id,
        },
      });
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
