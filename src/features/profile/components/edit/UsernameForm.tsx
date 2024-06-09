import { useAppDispatch, useAppSelector } from '@/app/hooks';
import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import { z } from 'zod';

import {
  closeModal,
  putPersonalDetails,
  selectProfileUsername,
} from '@/features/profile/profileSlice';
import { addPushNotification } from '@/features/pushNotification/pushNotificationSlice';

import { PushNotificationType } from '@/types/entityData/StatusNotificationData';
import { ErrorData } from '@/types/fetchResponse/error/ErrorData';

import FormWrapper from './FormWrapper';
import * as S from './UsernameForm.styled';
import { ErrorMessage } from '@/components/styled/ErrorMessage';
import ProfileInput from '../general/ProfileInput';
import InputDescription from '@/components/general/InputDesciption';
import SubmitButton from '@/components/general/SubmitButton';
import CancelButton from '@/components/general/CancelButton';
import ProfileLabel from '../general/ProfileLabel';

const UsernameFormSchema = z.object({
  username: z
    .string()
    .min(3, 'Username must contain at least 3 characters')
    .max(100, 'Username must contain at most 100 characters'),
});
type TUsernameFormSchema = z.infer<typeof UsernameFormSchema>;

const UsernameForm = () => {
  const username = useAppSelector(selectProfileUsername) as string;

  const {
    register,
    handleSubmit,
    formState: { isDirty, isSubmitting, errors },
  } = useForm<TUsernameFormSchema>({
    resolver: zodResolver(UsernameFormSchema),
    defaultValues: { username },
  });

  const dispatch = useAppDispatch();

  const handleModalClose = (): void => {
    dispatch(closeModal());
  };

  const handleFormSubmit = async (
    formData: TUsernameFormSchema,
  ): Promise<void> => {
    if (!isSubmitting)
      try {
        const response = await dispatch(putPersonalDetails(formData)).unwrap();

        if (response) {
          dispatch(
            addPushNotification(
              'username updated successfully',
              PushNotificationType.SUCCESS,
            ),
          );
          dispatch(closeModal());
        }
      } catch (err) {
        const error = err as ErrorData;

        dispatch(
          addPushNotification(
            error.errors![0].msg || error.message,
            PushNotificationType.ERROR,
          ),
        );
        dispatch(closeModal());
      }
  };

  const isSubmitDisabled = !isDirty || isSubmitting;

  return (
    <FormWrapper>
      <S.Form onSubmit={handleSubmit(handleFormSubmit)}>
        <S.InputWrapper>
          <ProfileLabel htmlFor="edit-username">Username</ProfileLabel>
          <ProfileInput id="edit-username" {...register('username')} />
          <InputDescription>
            You can sign in using this username
          </InputDescription>
          <ErrorMessage $isVisible={Boolean(errors.username)}>
            {errors.username?.message}
          </ErrorMessage>
        </S.InputWrapper>
        <S.ControlsWrapper>
          <CancelButton onClick={handleModalClose} type="button">
            Cancel
          </CancelButton>
          <SubmitButton disabled={isSubmitDisabled} type="submit" value="Save">
            Save
          </SubmitButton>
        </S.ControlsWrapper>
      </S.Form>
    </FormWrapper>
  );
};

export default UsernameForm;
