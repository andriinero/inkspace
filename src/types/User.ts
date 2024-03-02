enum UserRole {
  USER = 'user',
  ADMIN = 'admin',
}

export type User = {
  sub: string;
  username: string;
  role: UserRole;
};
