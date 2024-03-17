import { z } from 'zod';
import { PostAuthorDataSchema } from './PostAuthorData';

export const AuthorDataSchema = z.object({
  _id: z.string(),
  username: z.string(),
  followed_users: z.array(PostAuthorDataSchema),
  sign_up_date: z.string(),
  bio: z.string().optional(),
  profile_image: z.string(),
});

export type AuthorData = z.infer<typeof AuthorDataSchema>;
