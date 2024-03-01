import { useState, ChangeEvent, FormEvent } from 'react';
import { useAppDispatch, useAppSelector } from '@/app/hooks';

import { Comment } from '@/types/Comment';
import { MAX_CHARACTERS_PER_COMMENT } from '@/data/consts';

import { selectIsAuthenticated } from '@/features/auth/authSlice';
import { postComment, selectIsCommentsOpen } from '../singlePagePostSlice';

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
  commentList: Comment[];
};

const PostComments = ({ commentList }: PostCommentsProps) => {
  const isAuthenticated = useAppSelector(selectIsAuthenticated);
  const isOpen = useAppSelector(selectIsCommentsOpen);

  const [newCommentText, setNewCommentText] = useState<string>('');
  const [isAnimated, setIsAnimated] = useState(false);

  const dispatch = useAppDispatch();

  const handleAnimationTrigger = () => {};

  const handleCommentChange = (e: ChangeEvent<HTMLTextAreaElement>): void => {
    if (e.target.value.length <= MAX_CHARACTERS_PER_COMMENT) {
      setNewCommentText(e.target.value);
    } else {
      handleAnimationTrigger();
    }
  };

  const handleCommentSubmit = async (e: FormEvent): Promise<void> => {
    e.preventDefault();
    const response = await dispatch(postComment(newCommentText)).unwrap();

    // TODO: implement react router solution
    if (response) location.reload();
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
            <StyledCounter isAnimated={isAnimated}>
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
