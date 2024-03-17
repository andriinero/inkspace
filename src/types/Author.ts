import { z } from 'zod';

export const AuthorSchema = z.object({
  _id: z.string(),
  username: z.string(),
  email: z.string(),
  bio: z.string().optional(),
  sign_up_date: z.string(),
  followed_users: z.string().array(),
  profile_image: z.string(),
});

export type Author = z.infer<typeof AuthorSchema>;
