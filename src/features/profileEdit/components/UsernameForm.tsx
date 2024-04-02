import { useForm } from 'react-hook-form';
import { useAppDispatch, useAppSelector } from '@/app/hooks';

import {
  closeModal,
  putPersonalDetails,
  selectPutPersonalDetailsState,
} from '../profileEditSlice';

import {
  CancelButton,
  ControlsWrapper,
  Form,
  InputWrapper,
  StyledInputText,
  StyledInputLabel,
  SubmitButton,
  StyledErrorMessage,
  InputDescription,
} from './UsernameForm.styled';
import FormWrapper from './FormWrapper';
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import { addNotification } from '@/features/pushNotification/pushNotificationSlice';
import { ErrorData } from '@/types/fetchResponse/error/ErrorData';
import { PushNotificationType } from '@/types/entityData/StatusNotificationData';
import { selectProfileUsername } from '@/features/profile/profileSlice';
import { useNavigate } from 'react-router-dom';

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
  const navigate = useNavigate();

  const handleModalClose = (): void => {
    dispatch(closeModal());
  };

  const handleFormSubmit = async (formData: TUsernameFormSchema): Promise<void> => {
    if (!isSubmitting)
      try {
        const response = await dispatch(putPersonalDetails(formData)).unwrap();
        if (response) {
          dispatch(closeModal());
          navigate('/');
        }
      } catch (err) {
        dispatch(addNotification((err as ErrorData).message, PushNotificationType.ERROR));
      }
  };

  return (
    <FormWrapper>
      <Form onSubmit={handleSubmit(handleFormSubmit)}>
        <InputWrapper>
          <StyledInputLabel htmlFor="edit-username">Username</StyledInputLabel>
          <StyledInputText id="edit-username" {...register('username')} />
          <InputDescription>You can sign in using this username</InputDescription>
          <StyledErrorMessage $isVisible={Boolean(errors.username)}>
            {errors.username?.message}
          </StyledErrorMessage>
        </InputWrapper>
        <ControlsWrapper>
          <CancelButton onClick={handleModalClose} type="button" value="Cancel" />
          <SubmitButton
            disabled={!isDirty || isSubmitting}
            $isDisabled={!isDirty || isSubmitting}
            type="submit"
            value="Save"
          />
        </ControlsWrapper>
      </Form>
    </FormWrapper>
  );
};

export default UsernameForm;
