import { z } from 'zod';

export const PostSignUpSchema = z.object({
  message: z.string(),
  _id: z.string(),
});

export type PostSignUp = z.infer<typeof PostSignUpSchema>;
