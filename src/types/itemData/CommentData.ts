import { z } from 'zod';
import { PostAuthorDataSchema } from './PostAuthorData';

export const CommentDataSchema = z.object({
  _id: z.string(),
  post: z.string(),
  author: PostAuthorDataSchema,
  body: z.string(),
  date: z.string(),
  edit_date: z.string().optional(),
});

export type CommentData = z.infer<typeof CommentDataSchema>;
