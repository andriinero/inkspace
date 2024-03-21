import { z } from 'zod';

export const PutProfileDataSchema = z.object({
  _id: z.string(),
  username: z.string(),
  email: z.string(),
  bio: z.string(),
});

export type PutProfileData = z.infer<typeof PutProfileDataSchema>;
