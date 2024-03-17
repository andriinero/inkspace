import { z } from 'zod';

import { UserRole } from './AuthData';

export const UserDataSchema = z.object({
  _id: z.string(),
  username: z.string(),
  email: z.string(),
  role: z.nativeEnum(UserRole),
  bio: z.string().optional(),
  user_posts: z.string().array(),
  post_bookmarks: z.string().array(),
  ignored_posts: z.string().array(),
  ignored_topics: z.string().array(),
  followed_users: z.string().array(),
  sign_up_date: z.string(),
  profile_image: z.string(),
});

export type UserData = z.infer<typeof UserDataSchema>;
