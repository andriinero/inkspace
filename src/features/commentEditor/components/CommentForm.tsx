import { useEffect } from 'react';
import { z } from 'zod';
import { Controller, useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { useAppDispatch, useAppSelector } from '@/app/hooks';

import {
  exitEditMode,
  postComment,
  selectCommentIsEditMode,
  selectEditCommentId,
  selectIsCommentOverflown,
  setIsOverflown,
  updateComment,
} from '../commentEditorSlice';
import {
  addComment,
  editComment,
  selectCommentById,
} from '@/features/commentList/commentListSlice';

import { ButtonInteraction } from '@/styles/animations/ButtonInteraction';

import CommentTextarea from './CommentTextarea';
import * as S from './CommentForm.styled';

const CommentFormSchema = z.object({
  body: z
    .string()
    .min(10, 'Comment body must contain at least 10 characters')
    .max(280, 'Comment body must contain at most 280 characters'),
});
type TCommentFormSchema = z.infer<typeof CommentFormSchema>;

const CommentForm = () => {
  const commendEditId = useAppSelector(selectEditCommentId) as string;
  const commentEditData = useAppSelector(selectCommentById(commendEditId));

  const isOverflown = useAppSelector(selectIsCommentOverflown);
  const isEditMode = useAppSelector(selectCommentIsEditMode);

  const {
    handleSubmit,
    formState: { isDirty, isSubmitting, errors },
    watch,
    setValue,
    reset,
    control,
  } = useForm<TCommentFormSchema>({
    resolver: zodResolver(CommentFormSchema),
    defaultValues: { body: '' },
  });

  useEffect(() => {
    setValue('body', commentEditData?.body as string);

    return () => {
      setValue('body', '');
    };
  }, [commentEditData, setValue]);

  const dispatch = useAppDispatch();

  const handleCommentPost = async (formData: TCommentFormSchema): Promise<void> => {
    const response = await dispatch(postComment(formData.body));

    if (response) {
      dispatch(addComment(response.payload));
      reset();
    }
  };

  const handleCommentPut = async (formData: TCommentFormSchema): Promise<void> => {
    const response = await dispatch(updateComment(formData.body)).unwrap();

    if (response) {
      reset();
      dispatch(exitEditMode());
      dispatch(
        editComment({
          commentId: response._id,
          commentBody: response.body,
          editDate: response.edit_date,
        })
      );
    }
  };

  const handleEditCancelClick = (): void => {
    dispatch(exitEditMode());
  };

  const commentBodyLength = watch('body', '').length;

  const handleFormSubmit = isEditMode ? handleCommentPut : handleCommentPost;

  const isSubmitDisabled = !isDirty || isSubmitting;

  return (
    <S.FormWrapper>
      <S.Form onSubmit={handleSubmit(handleFormSubmit)}>
        <Controller
          control={control}
          name="body"
          render={({ field }) => {
            // eslint-disable-next-line @typescript-eslint/no-unused-vars
            const { ref, ...nonFieldRef } = field;

            return <CommentTextarea {...nonFieldRef} errors={errors} />;
          }}
        />
        <S.StyledErrorMessage $isVisible={Boolean(errors.body)}>
          {errors.body?.message}
        </S.StyledErrorMessage>
        <S.BottomWrapper>
          <S.StyledCounter
            isOverflown={isOverflown}
            setIsOverflown={(value: boolean) => {
              dispatch(setIsOverflown(value));
            }}
          >
            {commentBodyLength}/280
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
              disabled={isSubmitDisabled}
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
