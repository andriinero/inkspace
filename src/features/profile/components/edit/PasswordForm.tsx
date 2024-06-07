import { z } from 'zod';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { useAppDispatch, useAppSelector } from '@/app/hooks';

import {
  closeModal,
  putPassword,
  selectPutPasswordState,
} from '@/features/profile/profileSlice';
import { addNotification } from '@/features/pushNotification/pushNotificationSlice';

import type { ErrorData } from '@/types/fetchResponse/error/ErrorData';
import { PushNotificationType } from '@/types/entityData/StatusNotificationData';

import FormWrapper from './FormWrapper';
import * as S from './PasswordForm.styled';
import ProfileLabel from '../general/ProfileLabel';
import ProfileInput from '../general/ProfileInput';
import { ErrorMessage } from '@/components/styled/ErrorMessage';
import InputDescription from '@/components/general/InputDesciption';
import CancelButton from '@/components/general/CancelButton';
import SubmitButton from '@/components/general/SubmitButton';

const ProfilePasswordEditSchema = z
  .object({
    password: z.string().min(8, 'Password must contain at least 8 characters'),
    passwordConfirmation: z.string(),
  })
  .refine((data) => data.password === data.passwordConfirmation, {
    message: "Passwords don't match",
    path: ['passwordConfirmation'],
  });
export type TProfilePasswordEditSchema = z.infer<
  typeof ProfilePasswordEditSchema
>;

const PasswordForm = () => {
  const {
    register,
    handleSubmit,
    formState: { isDirty, isSubmitting, errors },
  } = useForm<TProfilePasswordEditSchema>({
    defaultValues: {
      password: '',
      passwordConfirmation: '',
    },
    resolver: zodResolver(ProfilePasswordEditSchema),
  });

  const { error } = useAppSelector(selectPutPasswordState);

  const dispatch = useAppDispatch();

  const handleModalClose = (): void => {
    dispatch(closeModal());
  };

  const handleFormSubmit = async (
    formData: TProfilePasswordEditSchema,
  ): Promise<void> => {
    if (!isSubmitting)
      try {
        const response = await dispatch(putPassword(formData)).unwrap();
        if (response) {
          dispatch(
            addNotification(
              'password updated successfully',
              PushNotificationType.SUCCESS,
            ),
          );
          dispatch(closeModal());
        }
      } catch (err) {
        dispatch(
          addNotification(
            (err as ErrorData).message,
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
          <ProfileLabel htmlFor="edit-password">Password</ProfileLabel>
          <ProfileInput
            {...register('password')}
            id="edit-password"
            type="password"
            placeholder="••••••••"
          />
          <ErrorMessage $isVisible={Boolean(errors.password)}>
            {errors.password?.message}
          </ErrorMessage>
          <S.InputWrapper>
            <ProfileLabel htmlFor="edit-password-confirmation">
              Confirm Password
            </ProfileLabel>
            <ProfileInput
              {...register('passwordConfirmation')}
              id="edit-password-confirmation"
              type="password"
              placeholder="••••••••"
            />
            <InputDescription>
              You can sign in using your new password
            </InputDescription>
            <ErrorMessage $isVisible={Boolean(errors.passwordConfirmation)}>
              {errors.passwordConfirmation?.message}
            </ErrorMessage>
            {error && (
              <ErrorMessage $isVisible={true}>
                An error has occurred while submitting the form
              </ErrorMessage>
            )}
          </S.InputWrapper>
        </S.InputWrapper>
        <S.ControlsWrapper>
          <CancelButton onClick={handleModalClose}>Cancel</CancelButton>
          <SubmitButton disabled={isSubmitDisabled} type="submit">
            Save
          </SubmitButton>
        </S.ControlsWrapper>
      </S.Form>
    </FormWrapper>
  );
};

export default PasswordForm;
