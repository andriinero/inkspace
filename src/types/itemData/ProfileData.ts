import { z } from 'zod';

import { UserRole } from './AuthenticationData';

export const ProfileDataSchema = z.object({
  _id: z.string(),
  username: z.string().min(3).max(100),
  email: z.string().min(3).max(100),
  role: z.nativeEnum(UserRole),
  bio: z.string().max(280).optional(),
  user_posts: z.string().array(),
  post_bookmarks: z.string().array(),
  ignored_posts: z.string().array(),
  ignored_topics: z.string().array(),
  followed_users: z.string().array(),
  sign_up_date: z.string(),
  profile_image: z.string().optional(),
});

export type ProfileData = z.infer<typeof ProfileDataSchema>;
