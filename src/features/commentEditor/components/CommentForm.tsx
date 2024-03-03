import { ChangeEvent, FormEvent, useState } from 'react';
import { useAppDispatch, useAppSelector } from '@/app/hooks';

import { MAX_CHARACTERS_PER_COMMENT, MIN_CHARACTERS_PER_COMMENT } from '@/data/consts';

import {
  Form,
  FormWrapper,
  InputText,
  SubmitActionButton,
  StyledCounter,
  BottomWrapper,
  ControlsWrapper,
  CancelActionButton,
} from './CommentForm.styled';

import {
  exitEditMode,
  postComment,
  selectCommentIsEditMode,
  selectCommentTextField,
  selectEditCommentId,
  setCommentTextField,
  updateComment,
} from '../commentEditorSlice';
import { addComment, editComment } from '@/features/commentList/commentListSlice';

type CommentFormProps = { postId: string };

const CommentForm = ({ postId }: CommentFormProps) => {
  const commentText = useAppSelector(selectCommentTextField);
  const isEditMode = useAppSelector(selectCommentIsEditMode);
  const editCommentId = useAppSelector(selectEditCommentId);

  const [isOverflown, setIsOverflown] = useState<boolean>(false);

  const dispatch = useAppDispatch();

  const handleCommentChange = (e: ChangeEvent<HTMLTextAreaElement>): void => {
    if (e.target.value.length >= MAX_CHARACTERS_PER_COMMENT) {
      setIsOverflown(true);
    } else {
      dispatch(setCommentTextField(e.target.value));
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
        dispatch(setCommentTextField(''));
        dispatch(addComment(response.payload));
      }
    }
  };

  const handleCommentUpdate = async (e: FormEvent) => {
    e.preventDefault();

    if (commentText.length < MIN_CHARACTERS_PER_COMMENT) {
      setIsOverflown(true);
    } else {
      if (isEditMode && editCommentId) {
        const response = await dispatch(
          updateComment({ commentId: editCommentId, commentBody: commentText })
        ).unwrap();
        if (response) {
          dispatch(setCommentTextField(''));
          dispatch(exitEditMode());
          dispatch(
            editComment({
              commentId: response._id,
              commentBody: response.body,
              editDate: response.edit_date,
            })
          );
        }
      }
    }
  };

  const handleEditCancel = () => {
    dispatch(exitEditMode());
  };

  const handleFormSubmit = isEditMode ? handleCommentUpdate : handleCommentSubmit;

  return (
    <FormWrapper>
      <Form onSubmit={handleFormSubmit}>
        <InputText
          onChange={handleCommentChange}
          placeholder="What are your thoughts?"
          value={commentText}
        />
        <BottomWrapper>
          <StyledCounter isOverflown={isOverflown}>
            {commentText.length}/280
          </StyledCounter>
          <ControlsWrapper>
            {isEditMode && (
              <CancelActionButton
                onButtonClick={handleEditCancel}
                type="button"
                value="Cancel"
              />
            )}
            <SubmitActionButton type="submit" value={isEditMode ? 'Update' : 'Respond'} />
          </ControlsWrapper>
        </BottomWrapper>
      </Form>
    </FormWrapper>
  );
};

export default CommentForm;
