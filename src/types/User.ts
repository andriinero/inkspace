enum UserRole {
  USER = 'user',
  ADMIN = 'admin',
}

export type User = {
  username: string;
  email: string;
  role: UserRole;
};
