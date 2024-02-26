import { Wrapper } from './CommentItem.styled';

type CommentProps = {
  _id: string;
  post: string;
  email: string;
  title: string;
  body: string;
  date: string;
};

const Comment = ({ _id, post, email, title, body, date }: CommentProps) => {
  return <Wrapper>{body}</Wrapper>;
};

export default Comment;
