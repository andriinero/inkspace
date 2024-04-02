import { z } from 'zod';
import { useForm } from 'react-hook-form';
import { useAppDispatch, useAppSelector } from '@/app/hooks';
import { zodResolver } from '@hookform/resolvers/zod';
import { useNavigate } from 'react-router-dom';

import {
  closeModal,
  putPersonalDetails,
  selectPutPersonalDetailsState,
} from '../profileEditSlice';
import { addNotification } from '@/features/pushNotification/pushNotificationSlice';
import { selectProfileEmail } from '@/features/profile/profileSlice';

import { ErrorData } from '@/types/fetchResponse/error/ErrorData';
import { PushNotificationType } from '@/types/entityData/StatusNotificationData';
import { ButtonInteraction } from '@/styles/animations/ButtonInteraction';

import FormWrapper from './FormWrapper';
import * as S from './EmailForm.styled';

const EmailFormSchema = z.object({
  email: z
    .string()
    .email()
    .min(3, 'Email must contain at least 3 characters')
    .max(100, 'Email must contain at most 100 characters'),
});
type TEmailFormSchema = z.infer<typeof EmailFormSchema>;

const EmailForm = () => {
  const email = useAppSelector(selectProfileEmail) as string;

  const {
    register,
    handleSubmit,
    formState: { isDirty, isSubmitting, errors },
  } = useForm<TEmailFormSchema>({
    resolver: zodResolver(EmailFormSchema),
    defaultValues: { email },
  });

  const { error } = useAppSelector(selectPutPersonalDetailsState);

  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  const handleModalClose = (): void => {
    dispatch(closeModal());
  };

  const handleFormSubmit = async (formData: TEmailFormSchema): Promise<void> => {
    if (!isSubmitting)
      try {
        const response = await dispatch(putPersonalDetails(formData)).unwrap();
        if (response) {
          dispatch(
            addNotification('email updated successfully', PushNotificationType.SUCCESS)
          );
          dispatch(closeModal());
          navigate('/');
        }
      } catch (err) {
        dispatch(addNotification((err as ErrorData).message, PushNotificationType.ERROR));
      }
  };

  const isSubmitDisabled = !isDirty || isSubmitting;

  return (
    <FormWrapper>
      <S.Form onSubmit={handleSubmit(handleFormSubmit)}>
        <S.InputWrapper>
          <S.StyledInputLabel htmlFor="edit-email">Email</S.StyledInputLabel>
          <S.StyledInputText id="edit-email" {...register('email')} />
          <S.InputDescription>Your personal email</S.InputDescription>
          <S.StyledErrorMessage $isVisible={Boolean(errors.email)}>
            {errors.email?.message}
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
            type="button"
            value="Cancel"
            whileTap={ButtonInteraction.whileTap.animation}
          />
          <S.SubmitButton
            disabled={isSubmitDisabled}
            $isDisabled={isSubmitDisabled}
            type="submit"
            value="Save"
            whileTap={
              !isSubmitDisabled ? ButtonInteraction.whileTap.animation : undefined
            }
          />
        </S.ControlsWrapper>
      </S.Form>
    </FormWrapper>
  );
};

export default EmailForm;
