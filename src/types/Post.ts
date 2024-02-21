import { Author } from './Author';
import { Comment } from './Comment';
import { Topic } from './Topic';

type Post = {
  _id: string;
  author: Author;
  title: string;
  body: string;
  date: string;
  topic: Topic;
  comments: Comment[];
};

export default Post;
