import { z } from "zod";

export const SignUpSchema = z
  .object({
    username: z
      .string()
      .min(3, "Username must contain at least 3 characters")
      .max(100, "Username must contain at most 100 characters"),
    email: z
      .string()
      .email()
      .min(3, "Email must contain at least 3 characters")
      .max(100, "Email must contain at most 100 characters"),
    password: z.string().min(8, "Password must contain at least 8 characters"),
    confirmPassword: z.string(),
  })
  .refine(({ password, confirmPassword }) => password === confirmPassword, {
    message: "Passwords don't match",
    path: ["confirmPassword"],
  });

export type TSignUpSchema = z.infer<typeof SignUpSchema>;
