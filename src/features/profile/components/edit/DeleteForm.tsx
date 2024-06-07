import { z } from 'zod';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { useAppDispatch, useAppSelector } from '@/app/hooks';

import { selectProfileUsername } from '@/features/profile/profileSlice';
import { addNotification } from '@/features/pushNotification/pushNotificationSlice';
import {
  closeModal,
  deleteProfile,
  selectDeleteProfileState,
} from '@/features/profile/profileSlice';

import { ErrorData } from '@/types/fetchResponse/error/ErrorData';
import { PushNotificationType } from '@/types/entityData/StatusNotificationData';

import FormWrapper from './FormWrapper';
import * as S from './DeleteForm.styled';
import ProfileLabel from '../general/ProfileLabel';
import ProfileInput from '../general/ProfileInput';
import { ErrorMessage } from '@/components/styled/ErrorMessage';
import CancelButton from '@/components/general/CancelButton';
import SubmitButton from '@/components/general/SubmitButton';

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

  const { error } = useAppSelector(selectDeleteProfileState);

  const dispatch = useAppDispatch();

  const handleModalClose = (): void => {
    dispatch(closeModal());
  };

  const handleFormSubmit = async (): Promise<void> => {
    try {
      const response = await dispatch(deleteProfile()).unwrap();

      if (response) {
        dispatch(
          addNotification(
            'Thank you for using my app! We are sad to see you go :( -Siriuszx',
            PushNotificationType.SUCCESS,
          ),
        );
      }
    } catch (err) {
      dispatch(
        addNotification((err as ErrorData).message, PushNotificationType.ERROR),
      );
    }
  };

  const isSubmitDisabled = !isValid || isSubmitting;

  return (
    <FormWrapper>
      <S.Form onSubmit={handleSubmit(handleFormSubmit)}>
        <S.Header>Are you sure you want to delete your account?</S.Header>
        <S.InputWrapper>
          <ProfileLabel htmlFor="edit-profile-delete">
            Type "{currentUsername}" to delete your account
          </ProfileLabel>
          <ProfileInput
            id="edit-profile-delete"
            {...register('confirmUsername')}
          />
          <ErrorMessage $isVisible={Boolean(errors.confirmUsername)}>
            {errors.confirmUsername?.message}
          </ErrorMessage>
          {error && (
            <ErrorMessage $isVisible={true}>
              An error has occurred while submitting the form
            </ErrorMessage>
          )}
        </S.InputWrapper>
        <S.ControlsWrapper>
          <CancelButton onClick={handleModalClose} type="button">
            Cancel
          </CancelButton>
          <SubmitButton disabled={isSubmitDisabled} type="submit">
            Delete
          </SubmitButton>
        </S.ControlsWrapper>
        <S.InputDescriptionDanger>
          You can't undo this action!
        </S.InputDescriptionDanger>
      </S.Form>
    </FormWrapper>
  );
};

export default DeleteForm;
