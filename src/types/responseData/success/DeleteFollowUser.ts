import { z } from 'zod';

export const DeleteFollowUserSchema = z.object({
  _id: z.string(),
});

export type DeleteFollowUser = z.infer<typeof DeleteFollowUserSchema>;
