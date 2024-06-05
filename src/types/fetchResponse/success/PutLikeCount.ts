import { z } from 'zod';

export const PutLikeCountSchema = z.object({
  _id: z.string(),
  like_count: z.number(),
});

export type PutLikeCount = z.infer<typeof PutLikeCountSchema>;
