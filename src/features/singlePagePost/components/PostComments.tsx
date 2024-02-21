import { Comment } from '@/types/Comment';

import { Wrapper } from './PostComments.styled';

type PostCommentsProps = {
  isOpen: boolean;
  commentList: Comment[];
};

const PostComments = ({ isOpen, commentList }: PostCommentsProps) => {
  return <Wrapper $isOpen={isOpen}>something</Wrapper>;
};

export default PostComments;
