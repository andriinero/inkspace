import { z } from "zod";

export const GeneralAuthorDataSchema = z.object({
  _id: z.string(),
  username: z.string(),
  profile_image: z.string().optional(),
  bio: z.string().optional(),
});

export type GeneralAuthorData = z.infer<typeof GeneralAuthorDataSchema>;
