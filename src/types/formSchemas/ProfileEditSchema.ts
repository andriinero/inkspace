import { z } from 'zod';

export const ProfileEditSchema = z.object({
  username: z
    .string()
    .min(3, 'Username must contain at least 3 character(s)')
    .max(100, 'Username must contain at most 100 character(s)'),
  email: z
    .string()
    .min(3, 'Email must contain at least 3 character(s)')
    .max(100, 'Email must contain at most 100 character(s)')
    .email(),
  password: z.string().min(8, 'Password must contain at least 8 character(s)'),
  bio: z.string().max(280, 'Bio must contain at most 280 character(s)'),
});

export type TProfileEditSchema = z.infer<typeof ProfileEditSchema>;
