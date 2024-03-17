import { z } from 'zod';

export const PostAuthorDataSchema = z.object({
  _id: z.string(),
  username: z.string(),
  profile_image: z.string(),
});

export type PostAuthorData = z.infer<typeof PostAuthorDataSchema>;
