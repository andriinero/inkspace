import { z } from 'zod';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { useAppDispatch, useAppSelector } from '@/app/hooks';

import { selectProfileUsername } from '@/features/profile/profileSlice';

import FormWrapper from './FormWrapper';
import * as S from './DeleteForm.styled';
import { addNotification } from '@/features/pushNotification/pushNotificationSlice';
import { ErrorData } from '@/types/fetchResponse/error/ErrorData';
import { PushNotificationType } from '@/types/entityData/StatusNotificationData';
import { useNavigate } from 'react-router-dom';
import { ButtonInteraction } from '@/styles/animations/ButtonInteraction';
import { closeModal, selectPutProfileImageState } from '../profileEditSlice';

const DeleteFormSchema = z
  .object({
    username: z.string(),
    confirmUsername: z.string(),
  })
  .refine(({ username, confirmUsername }) => username === confirmUsername, {
    message: "Usernames don't match",
    path: ['confirmUsername'],
  });
type TDeleteFormSchema = z.infer<typeof DeleteFormSchema>;

const DeleteForm = () => {
  const currentUsername = useAppSelector(selectProfileUsername) as string;

  const {
    register,
    handleSubmit,
    formState: { errors, isValid, isSubmitting },
  } = useForm<TDeleteFormSchema>({
    resolver: zodResolver(DeleteFormSchema),
    defaultValues: { username: currentUsername, confirmUsername: '' },
  });

  const { error } = useAppSelector(selectPutProfileImageState);

  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  const handleModalClose = (): void => {
    dispatch(closeModal());
  };

  const handleFormSubmit = async (formData: TDeleteFormSchema): Promise<void> => {
    try {
      const response = await dispatch().unwrap();

      if (response) {
        dispatch(
          addNotification(
            'Thank you for using my app! We are sad to see you go :( -Siriuszx',
            PushNotificationType.SUCCESS
          )
        );
      }
    } catch (err) {
      dispatch(addNotification((err as ErrorData).message, PushNotificationType.ERROR));
    }
  };

  const isSubmitDisabled = !isValid || isSubmitting;

  return (
    <FormWrapper>
      <S.Form onSubmit={handleSubmit(handleFormSubmit)}>
        <S.Header>Are you sure you want to delete your account?</S.Header>
        <S.InputWrapper>
          <S.StyledInputLabel htmlFor="edit-profile-delete">
            Type "{currentUsername}" to delete your account
          </S.StyledInputLabel>
          <S.StyledInputText id="edit-profile-delete" {...register('confirmUsername')} />
          <S.StyledErrorMessage $isVisible={Boolean(errors.confirmUsername)}>
            {errors.confirmUsername?.message}
          </S.StyledErrorMessage>
          {error && (
            <S.StyledErrorMessage $isVisible={true}>
              An error has occurred while submitting the form
            </S.StyledErrorMessage>
          )}
        </S.InputWrapper>
        <S.ControlsWrapper>
          <S.CancelButton
            onClick={handleModalClose}
            whileTap={ButtonInteraction.whileTap.animation}
            type="button"
            value="Cancel"
          />
          <S.SubmitButton
            disabled={isSubmitDisabled}
            $isDisabled={isSubmitDisabled}
            type="submit"
            value="Submit"
            whileTap={
              !isSubmitDisabled ? ButtonInteraction.whileTap.animation : undefined
            }
          />
        </S.ControlsWrapper>
        <S.InputDescriptionDanger>You can't undo this action!</S.InputDescriptionDanger>
      </S.Form>
    </FormWrapper>
  );
};

export default DeleteForm;
