import { z } from 'zod';

export const FullAuthorDataSchema = z.object({
  _id: z.string(),
  username: z.string(),
  followed_users: z.string().array(),
  sign_up_date: z.string(),
  bio: z.string(),
  profile_image: z.string(),
});

export type AuthorData = z.infer<typeof FullAuthorDataSchema>;
