import { z } from 'zod';

export const PutLikeCountSchema = z.object({
  _id: z.string(),
  like_count: z.number().min(0),
});

export type PutLikeCount = z.infer<typeof PutLikeCountSchema>;
