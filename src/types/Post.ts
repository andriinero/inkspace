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
  topic: string;
  comments: [];
  __v: number;
};

export default Post;
