import { z } from 'zod';

export const DeleteCommentSchema = z.object({
  _id: z.string(),
  body: z.string().min(10).max(280),
  author: z.string(),
  post: z.string(),
  date: z.string(),
});

export type deleteComment = z.infer<typeof DeleteCommentSchema>;
