import { Author } from './Author';
import { Topic } from './Topic';

type Post = {
  _id: string;
  author: Author;
  title: string;
  body: string;
  date: string;
  topic: Topic;
};

export default Post;
