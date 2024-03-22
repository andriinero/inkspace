import { z } from 'zod';

export const ProfilePasswordEditSchema = z
  .object({
    password: z.string().min(8, 'Password must contain at least 8 character(s)'),
    passwordConfirmation: z.string(),
  })
  .refine((data) => data.password === data.passwordConfirmation, {
    message: "Passwords don't match",
    path: ['passwordConfirmation'],
  });

export type TProfilePasswordEditSchema = z.infer<typeof ProfilePasswordEditSchema>;
