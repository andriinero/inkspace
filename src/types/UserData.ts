import { UserRole } from './AuthData';

export type UserData = {
  _id: string;
  username: string;
  email: string;
  role: UserRole;
  bio?: string;
  user_posts: string[];
  post_bookmarks: string[];
  ignored_posts: string[];
  ignored_topics: string[];
  followed_users: string[];
  sign_up_date: string;
};
