import { z } from "zod";

export const ProfileDataEditSchema = z.object({
  username: z
    .string()
    .min(3, "Username must contain at least 3 character(s)")
    .max(100, "Username must contain at most 100 character(s)")
    .optional(),
  email: z
    .string()
    .min(3, "Email must contain at least 3 character(s)")
    .max(100, "Email must contain at most 100 character(s)")
    .email()
    .optional(),
  bio: z
    .string()
    .max(280, "Bio must contain at most 280 character(s)")
    .optional(),
});

export type TProfileDataEditSchema = z.infer<typeof ProfileDataEditSchema>;
