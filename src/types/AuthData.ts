export enum UserRole {
  USER = 'user',
  ADMIN = 'admin',
}

export type AuthData = {
  sub: string;
  username: string;
  role: UserRole;
};
