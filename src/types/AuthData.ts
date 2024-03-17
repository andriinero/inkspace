import { z } from 'zod';

export enum UserRole {
  USER = 'user',
  ADMIN = 'admin',
}

export const AuthDataSchema = z.object({
  sub: z.string(),
  username: z.string(),
  role: z.nativeEnum(UserRole),
});

export type AuthData = z.infer<typeof AuthDataSchema>;
