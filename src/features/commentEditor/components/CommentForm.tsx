import { ChangeEvent, FormEvent, useState } from 'react';
import { useAppDispatch } from '@/app/hooks';

import { MAX_CHARACTERS_PER_COMMENT, MIN_CHARACTERS_PER_COMMENT } from '@/data/consts';

import {
  Form,
  FormWrapper,
  InputText,
  StyledActionButton,
  StyledCounter,
  WrapperControls,
} from './CommentForm.styled';

import { postComment } from '../commentEditorSlice';
import { addComment } from '@/features/comments/commentsSlice';

type CommentFormProps = { postId: string };

const CommentForm = ({ postId }: CommentFormProps) => {
  const [commentText, setCommentText] = useState<string>('');
  const [isOverflown, setIsOverflown] = useState<boolean>(false);

  const dispatch = useAppDispatch();

  const handleCommentChange = (e: ChangeEvent<HTMLTextAreaElement>): void => {
    if (e.target.value.length >= MAX_CHARACTERS_PER_COMMENT) {
      setIsOverflown(true);
    } else {
      setCommentText(e.target.value);
      setIsOverflown(false);
    }
  };

  const handleCommentSubmit = async (e: FormEvent): Promise<void> => {
    e.preventDefault();

    if (commentText.length < MIN_CHARACTERS_PER_COMMENT) {
      setIsOverflown(true);
    } else {
      const response = await dispatch(postComment({ postId, commentBody: commentText }));
      if (response) {
        setCommentText('');
        dispatch(addComment(response.payload));
      }
    }
  };

  return (
    <FormWrapper>
      <Form onSubmit={handleCommentSubmit}>
        <InputText
          onChange={handleCommentChange}
          placeholder="What are your thoughts?"
          value={commentText}
        />
        <WrapperControls>
          <StyledCounter isOverflown={isOverflown}>
            {commentText.length}/280
          </StyledCounter>
          <StyledActionButton type="submit" value="Respond" />
        </WrapperControls>
      </Form>
    </FormWrapper>
  );
};

export default CommentForm;
