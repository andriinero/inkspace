import { z } from 'zod';

export const PostFollowUserSchema = z.object({
  _id: z.string(),
});

export type PostFollowUser = z.infer<typeof PostFollowUserSchema>;
