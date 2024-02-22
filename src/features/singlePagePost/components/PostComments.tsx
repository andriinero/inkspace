import { Comment } from '@/types/Comment';

import { Wrapper } from './PostComments.styled';
import { useAppSelector } from '@/app/hooks';
import { selectIsCommentsOpen } from '../singlePagePostSlice';

type PostCommentsProps = {
  commentList: Comment[];
};

const PostComments = ({ commentList }: PostCommentsProps) => {
  const isOpen = useAppSelector(selectIsCommentsOpen);

  return <Wrapper $isOpen={isOpen}>something</Wrapper>;
};

export default PostComments;
