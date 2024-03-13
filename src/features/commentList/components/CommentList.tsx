import { useEffect } from 'react';
import { useAppDispatch, useAppSelector } from '@/app/hooks';

import { selectIsAuthenticated } from '@/features/auth/authSlice';
import {
  closeComments,
  fetchComments,
  selectAreCommentsOpen,
  selectCommentList,
} from '@/features/commentList/commentListSlice';

import { Wrapper, Header, WrapperList } from './CommentList.styled';
import CommentItem from './CommentItem';
import CommentForm from '../../commentEditor/components/CommentForm';
import { exitEditMode } from '@/features/commentEditor/commentEditorSlice';

type PostCommentsProps = {
  postId: string | undefined;
};

const CommentList = ({ postId }: PostCommentsProps) => {
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
      <WrapperList>
        {commentList.map((comment) => (
          <CommentItem key={comment._id} {...comment} />
        ))}
      </WrapperList>
    </Wrapper>
  );
};

export default CommentList;
