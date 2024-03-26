import { z } from 'zod';

export const GeneralAuthorDataSchema = z.object({
  _id: z.string(),
  username: z.string(),
  profile_image: z.string().optional(),
});

export type PostAuthorData = z.infer<typeof GeneralAuthorDataSchema>;
