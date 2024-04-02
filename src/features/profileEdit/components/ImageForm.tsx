import { useForm } from 'react-hook-form';
import { useAppDispatch, useAppSelector } from '@/app/hooks';
import { useNavigate } from 'react-router-dom';
import { zodResolver } from '@hookform/resolvers/zod';

import {
  closeModal,
  putProfileImage,
  selectPutProfileImageState,
} from '../profileEditSlice';
import { addNotification } from '@/features/pushNotification/pushNotificationSlice';

import { ImageSchema, TImageSchema } from '@/types/formSchemas/ProfileImageSchema';
import { ButtonInteraction } from '@/styles/animations/ButtonInteraction';
import { ErrorData } from '@/types/fetchResponse/error/ErrorData';
import { PushNotificationType } from '@/types/entityData/StatusNotificationData';

import FormWrapper from './FormWrapper';
import * as S from './ImageForm.styled';

const ImageForm = () => {
  const {
    register,
    handleSubmit,
    formState: { isSubmitting, errors },
  } = useForm<TImageSchema>({ resolver: zodResolver(ImageSchema) });

  const { error } = useAppSelector(selectPutProfileImageState);

  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  const handleModalClose = (): void => {
    dispatch(closeModal());
  };

  const handleFormSubmit = async (formData: TImageSchema): Promise<void> => {
    try {
      const response = await dispatch(putProfileImage(formData.image as File)).unwrap();

      if (response) {
        dispatch(
          addNotification(
            'profile image updated successfully',
            PushNotificationType.SUCCESS
          )
        );
        dispatch(closeModal());
        navigate('/');
      }
    } catch (err) {
      dispatch(addNotification((err as ErrorData).message, PushNotificationType.ERROR));
    }
  };

  const isSubmitDisabled = isSubmitting;

  return (
    <FormWrapper>
      <S.Form onSubmit={handleSubmit(handleFormSubmit)}>
        <S.InputWrapper>
          <S.StyledInputLabel htmlFor="edit-profile-image">
            Upload Image:
          </S.StyledInputLabel>
          <S.StyledInputFile {...register('image')} id="edit-profile-image" type="file" />
          <S.InputDescription>Your profile image</S.InputDescription>
          <S.StyledErrorMessage $isVisible={Boolean(errors.image)}>
            {errors.image?.message as string}
          </S.StyledErrorMessage>
        </S.InputWrapper>
        <S.StyledErrorMessage $isVisible={Boolean(error)}>
          An error has occurred while submitting the form
        </S.StyledErrorMessage>
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
            value="Save Image"
            whileTap={
              !isSubmitDisabled ? ButtonInteraction.whileTap.animation : undefined
            }
          />
        </S.ControlsWrapper>
      </S.Form>
    </FormWrapper>
  );
};

export default ImageForm;
