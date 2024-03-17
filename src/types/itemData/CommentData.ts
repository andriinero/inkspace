import { z } from 'zod';
import { AuthorDataSchema } from './AuthorData';

export const CommentDataSchema = z.object({
  _id: z.string(),
  post: z.string(),
  author: AuthorDataSchema,
  title: z.string(),
  body: z.string(),
  date: z.string(),
  edit_date: z.string().optional(),
});

export type CommentData = z.infer<typeof CommentDataSchema>;
