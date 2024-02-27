import { Author } from './Author';

export type Comment = {
  _id: string;
  post: string;
  author: Author;
  title: string;
  body: string;
  date: string;
};
