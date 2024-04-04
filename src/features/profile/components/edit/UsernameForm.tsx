import { z } from 'zod';
import { useForm } from 'react-hook-form';
import { useAppDispatch, useAppSelector } from '@/app/hooks';
import { zodResolver } from '@hookform/resolvers/zod';

import {
  closeModal,
  putPersonalDetails,
  selectPutPersonalDetailsState,
  selectProfileUsername,
} from '@/features/profile/profileSlice';
import { addNotification } from '@/features/pushNotification/pushNotificationSlice';

import { ErrorData } from '@/types/fetchResponse/error/ErrorData';
import { PushNotificationType } from '@/types/entityData/StatusNotificationData';

import FormWrapper from './FormWrapper';
import * as S from './UsernameForm.styled';

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

  const { error } = useAppSelector(selectPutPersonalDetailsState);

  const dispatch = useAppDispatch();

  const handleModalClose = (): void => {
    dispatch(closeModal());
  };

  const handleFormSubmit = async (formData: TUsernameFormSchema): Promise<void> => {
    if (!isSubmitting)
      try {
        const response = await dispatch(putPersonalDetails(formData)).unwrap();

        if (response) {
          dispatch(
            addNotification('username updated successfully', PushNotificationType.SUCCESS)
          );
          dispatch(closeModal());
        }
      } catch (err) {
        const error = err as ErrorData;

        dispatch(
          addNotification(
            error.errors![0].msg || error.message,
            PushNotificationType.ERROR
          )
        );
        dispatch(closeModal());
      }
  };

  const isSubmitDisabled = !isDirty || isSubmitting;

  return (
    <FormWrapper>
      <S.Form onSubmit={handleSubmit(handleFormSubmit)}>
        <S.InputWrapper>
          <S.StyledInputLabel htmlFor="edit-username">Username</S.StyledInputLabel>
          <S.StyledInputText id="edit-username" {...register('username')} />
          <S.InputDescription>You can sign in using this username</S.InputDescription>
          <S.StyledErrorMessage $isVisible={Boolean(errors.username)}>
            {errors.username?.message}
          </S.StyledErrorMessage>
        </S.InputWrapper>
        <S.ControlsWrapper>
          <S.CancelButton onClick={handleModalClose} type="button" value="Cancel" />
          <S.SubmitButton disabled={isSubmitDisabled} type="submit" value="Save" />
        </S.ControlsWrapper>
      </S.Form>
    </FormWrapper>
  );
};

export default UsernameForm;
