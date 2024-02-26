import { Comment } from '@/types/Comment';

import { CommentList, Wrapper } from './PostComments.styled';
import { useAppSelector } from '@/app/hooks';
import { selectIsCommentsOpen } from '../singlePagePostSlice';
import CommentItem from './CommentItem';

type PostCommentsProps = {
  commentList: Comment[];
};

const PostComments = ({ commentList }: PostCommentsProps) => {
  const isOpen = useAppSelector(selectIsCommentsOpen);

  return (
    <Wrapper $isOpen={isOpen}>
      <CommentList>
        {commentList.map((comment) => (
          <CommentItem key={comment._id} {...comment} />
        ))}
      </CommentList>
    </Wrapper>
  );
};

export default PostComments;
