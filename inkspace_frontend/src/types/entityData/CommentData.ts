import { z } from 'zod';
import { GeneralAuthorDataSchema } from './GeneralAuthorData';

export const CommentDataSchema = z.object({
  _id: z.string(),
  author: GeneralAuthorDataSchema,
  post: z.string(),
  body: z.string(),
  date: z.string(),
  edit_date: z.string().optional(),
});

export type CommentData = z.infer<typeof CommentDataSchema>;
