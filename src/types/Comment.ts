import Post from './Post';

export type Comment = {
  _id: string;
  post: Post;
  email: string;
  title: string;
  body: string;
  date: string;
};
