import { Comment } from '@/types/Comment';

import { CommentList, Header, Wrapper } from './PostComments.styled';
import { useAppSelector } from '@/app/hooks';
import { selectIsCommentsOpen } from '../singlePagePostSlice';
import CommentItem from './CommentItem';
import { selectIsAuthenticated } from '@/features/auth/authSlice';

type PostCommentsProps = {
  commentList: Comment[];
};

const PostComments = ({ commentList }: PostCommentsProps) => {
  const isAuthenticated = useAppSelector(selectIsAuthenticated);
  const isOpen = useAppSelector(selectIsCommentsOpen);

  return (
    <Wrapper $isOpen={isOpen}>
      <Header>{`Responses (${commentList.length})`}</Header>
      <CommentList>
        {commentList.map((comment) => (
          <CommentItem key={comment._id} {...comment} />
        ))}
      </CommentList>
    </Wrapper>
  );
};

export default PostComments;
