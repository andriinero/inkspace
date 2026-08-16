import { z } from 'zod';

export const FullAuthorDataSchema = z.object({
  _id: z.string(),
  username: z.string(),
  followed_users_count: z.number().min(0),
  users_following_count: z.number().min(0),
  sign_up_date: z.string(),
  bio: z.string().optional(),
  profile_image: z.string().optional(),
});

export type FullAuthorData = z.infer<typeof FullAuthorDataSchema>;
