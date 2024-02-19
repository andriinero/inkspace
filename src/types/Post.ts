import { Topic } from "./Topic";

type Post = {
  _id: string;
  author: {
    _id: string;
    username: string;
    email: string;
  };
  title: string;
  body: string;
  date: string;
  topic: Topic;
  comments: [];
  __v: number;
};

export default Post;
