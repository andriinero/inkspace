import { useEffect } from 'react';
import { useAppDispatch, useAppSelector } from '@/app/hooks';

import { selectIsAuthenticated } from '@/features/auth/authSlice';
import {
  closeComments,
  fetchComments,
  selectAreCommentsOpen,
  selectCommentList,
} from '@/features/comments/commentsSlice';

import { Wrapper, Header, CommentList } from './PostComments.styled';
import CommentItem from './CommentItem';
import CommentForm from '../../commentEditor/components/CommentForm';
import { exitEditMode } from '@/features/commentEditor/commentEditorSlice';

type PostCommentsProps = {
  postId: string;
};

const PostComments = ({ postId }: PostCommentsProps) => {
  const isAuthenticated = useAppSelector(selectIsAuthenticated);

  const isOpen = useAppSelector(selectAreCommentsOpen);
  const commentList = useAppSelector(selectCommentList);

  const dispatch = useAppDispatch();

  useEffect(() => {
    const controller = dispatch(fetchComments(postId));

    return () => {
      dispatch(closeComments());
      dispatch(exitEditMode());
      controller.abort();
    };
  }, [postId, dispatch]);

  return (
    <Wrapper $isOpen={isOpen}>
      <Header>{`Responses (${commentList.length})`}</Header>
      {isAuthenticated && <CommentForm postId={postId} />}
      <CommentList>
        {commentList.map((comment) => (
          <CommentItem key={comment._id} {...comment} />
        ))}
      </CommentList>
    </Wrapper>
  );
};

export default PostComments;
