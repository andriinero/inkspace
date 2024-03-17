import { z } from 'zod';

import { AuthorSchema } from './Author';

const CommentSchema = z.object({
  _id: z.string(),
  post: z.string(),
  author: AuthorSchema,
  title: z.string(),
  body: z.string(),
  date: z.string(),
  edit_date: z.string().optional(),
});

export type Comment = z.infer<typeof CommentSchema>;
