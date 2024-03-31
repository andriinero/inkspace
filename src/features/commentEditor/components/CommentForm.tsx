import { ChangeEvent, FormEvent } from 'react';
import { useAppDispatch, useAppSelector } from '@/app/hooks';

import { MAX_CHARACTERS_PER_COMMENT, MIN_CHARACTERS_PER_COMMENT } from '@/data/consts';

import {
  exitEditMode,
  postComment,
  selectCommentIsEditMode,
  selectCommentTextField,
  selectEditCommentId,
  selectIsCommentOverflown,
  setCommentTextField,
  setIsOverflown,
  updateComment,
} from '../commentEditorSlice';
import { addComment, editComment } from '@/features/commentList/commentListSlice';

import { ButtonInteraction } from '@/styles/animations/ButtonInteraction';

import * as S from './CommentForm.styled';

type CommentFormProps = { postId: string };

const CommentForm = ({ postId }: CommentFormProps) => {
  const commentText = useAppSelector(selectCommentTextField);
  const isOverflown = useAppSelector(selectIsCommentOverflown);
  const isEditMode = useAppSelector(selectCommentIsEditMode);
  const editCommentId = useAppSelector(selectEditCommentId);

  const dispatch = useAppDispatch();

  const handleCommentChange = (e: ChangeEvent<HTMLTextAreaElement>): void => {
    if (e.target.value.length <= MAX_CHARACTERS_PER_COMMENT) {
      dispatch(setCommentTextField(e.target.value));
    } else {
      dispatch(setIsOverflown(true));
    }
  };

  const handleCommentSubmit = async (e: FormEvent): Promise<void> => {
    e.preventDefault();

    if (commentText.length > MIN_CHARACTERS_PER_COMMENT) {
      const response = await dispatch(postComment({ postId, commentBody: commentText }));
      if (response) {
        dispatch(setCommentTextField(''));
        dispatch(addComment(response.payload));
      }
    }
  };

  const handleCommentUpdate = async (e: FormEvent): Promise<void> => {
    e.preventDefault();

    if (commentText.length >= MIN_CHARACTERS_PER_COMMENT) {
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

  const handleEditCancelClick = (): void => {
    dispatch(exitEditMode());
  };

  const handleFormSubmit = isEditMode ? handleCommentUpdate : handleCommentSubmit;

  return (
    <S.FormWrapper>
      <S.Form onSubmit={handleFormSubmit}>
        <S.InputText
          onChange={handleCommentChange}
          placeholder="What are your thoughts?"
          value={commentText}
        />
        <S.BottomWrapper>
          <S.StyledCounter
            isOverflown={isOverflown}
            setIsOverflown={(value: boolean) => {
              dispatch(setIsOverflown(value));
            }}
          >
            {commentText.length}/280
          </S.StyledCounter>
          <S.ControlsWrapper>
            {isEditMode && (
              <S.CancelActionButton
                onClick={handleEditCancelClick}
                type="button"
                value="Cancel"
                whileTap={ButtonInteraction.whileTap.animation}
              />
            )}
            <S.SubmitActionButton
              type="submit"
              value={isEditMode ? 'Update' : 'Respond'}
              whileTap={ButtonInteraction.whileTap.animation}
            />
          </S.ControlsWrapper>
        </S.BottomWrapper>
      </S.Form>
    </S.FormWrapper>
  );
};

export default CommentForm;
