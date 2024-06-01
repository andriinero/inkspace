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

import { ErrorData } from '@/types/fetchResponse/error/ErrorData';
import { PushNotificationType } from '@/types/entityData/StatusNotificationData';

import FormWrapper from './FormWrapper';
import * as S from './PasswordForm.styled';

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
          <S.StyledInputLabel htmlFor="edit-password">
            Password
          </S.StyledInputLabel>
          <S.StyledInputText
            {...register('password')}
            id="edit-password"
            type="password"
            placeholder="••••••••"
          />
          <S.StyledErrorMessage $isVisible={Boolean(errors.password)}>
            {errors.password?.message}
          </S.StyledErrorMessage>
          <S.InputWrapper>
            <S.StyledInputLabel htmlFor="edit-password-confirmation">
              Confirm Password
            </S.StyledInputLabel>
            <S.StyledInputText
              {...register('passwordConfirmation')}
              id="edit-password-confirmation"
              type="password"
              placeholder="••••••••"
            />
            <S.InputDescription>
              You can sign in using your new password
            </S.InputDescription>
            <S.StyledErrorMessage
              $isVisible={Boolean(errors.passwordConfirmation)}
            >
              {errors.passwordConfirmation?.message}
            </S.StyledErrorMessage>
            {error && (
              <S.StyledErrorMessage $isVisible={true}>
                An error has occurred while submitting the form
              </S.StyledErrorMessage>
            )}
          </S.InputWrapper>
        </S.InputWrapper>
        <S.ControlsWrapper>
          <S.CancelButton
            onClick={handleModalClose}
            type="button"
            value="Cancel"
          />
          <S.SubmitButton
            disabled={isSubmitDisabled}
            type="submit"
            value="Save"
          />
        </S.ControlsWrapper>
      </S.Form>
    </FormWrapper>
  );
};

export default PasswordForm;
