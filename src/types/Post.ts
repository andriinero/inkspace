import { Author } from './Author';
import { Topic } from './Topic';

type Post = {
  _id: string;
  author: Author;
  title: string;
  body: string;
  date: string;
  topic: Topic;
  thumbnail_image: string;
};

export default Post;
