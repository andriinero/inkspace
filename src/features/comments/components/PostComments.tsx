import { useState, ChangeEvent, FormEvent, useEffect } from 'react';
import { useAppDispatch, useAppSelector } from '@/app/hooks';

import { MAX_CHARACTERS_PER_COMMENT, MIN_CHARACTERS_PER_COMMENT } from '@/data/consts';

import { selectIsAuthenticated } from '@/features/auth/authSlice';
import {
  closeComments,
  fetchComments,
  postComment,
  selectAreCommentsOpen,
  selectCommentList,
} from '@/features/comments/commentsSlice';

import {
  CommentList,
  Form,
  Header,
  InputText,
  StyledActionButton,
  StyledCounter,
  Wrapper,
  WrapperControls,
} from './PostComments.styled';
import CommentItem from './CommentItem';

type PostCommentsProps = {
  postId: string;
};

const PostComments = ({ postId }: PostCommentsProps) => {
  const isAuthenticated = useAppSelector(selectIsAuthenticated);
  const isOpen = useAppSelector(selectAreCommentsOpen);
  const commentList = useAppSelector(selectCommentList);

  const [newCommentText, setNewCommentText] = useState<string>('');
  const [isOverflown, setIsOverflown] = useState<boolean>(false);

  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(fetchComments(postId));

    return () => {
      dispatch(closeComments());
    };
  }, [postId, dispatch]);

  const handleCommentChange = (e: ChangeEvent<HTMLTextAreaElement>): void => {
    if (e.target.value.length >= MAX_CHARACTERS_PER_COMMENT) {
      setIsOverflown(true);
    } else {
      setNewCommentText(e.target.value);
      setIsOverflown(false);
    }
  };

  const handleCommentSubmit = async (e: FormEvent): Promise<void> => {
    e.preventDefault();
    if (newCommentText.length < MIN_CHARACTERS_PER_COMMENT) {
      setIsOverflown(true);
    } else {
      const response = await dispatch(
        postComment({ postId, commentBody: newCommentText })
      );
      if (response) setNewCommentText('');
    }
  };

  return (
    <Wrapper $isOpen={isOpen}>
      <Header>{`Responses (${commentList.length})`}</Header>
      {isAuthenticated && (
        <Form onSubmit={handleCommentSubmit}>
          <InputText
            onChange={handleCommentChange}
            placeholder="What are your thoughts?"
            value={newCommentText}
          />
          <WrapperControls>
            {/* // TODO: ??? */}
            <StyledCounter isOverflown={isOverflown}>
              {newCommentText.length}/280
            </StyledCounter>
            <StyledActionButton type="submit" value="Respond" />
          </WrapperControls>
        </Form>
      )}
      <CommentList>
        {commentList.map((comment) => (
          <CommentItem key={comment._id} {...comment} />
        ))}
      </CommentList>
    </Wrapper>
  );
};

export default PostComments;
