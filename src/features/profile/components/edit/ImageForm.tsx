import { useForm } from 'react-hook-form';
import { useAppDispatch, useAppSelector } from '@/app/hooks';
import { zodResolver } from '@hookform/resolvers/zod';

import {
  closeModal,
  putProfileImage,
  selectPutProfileImageState,
} from '@/features/profile/profileSlice';
import { addPushNotification } from '@/features/pushNotification/pushNotificationSlice';

import {
  ImageSchema,
  TImageSchema,
} from '@/types/formSchemas/ProfileImageSchema';
import { ErrorData } from '@/types/fetchResponse/error/ErrorData';
import { PushNotificationType } from '@/types/entityData/StatusNotificationData';

import FormWrapper from './FormWrapper';
import * as S from './ImageForm.styled';
import ProfileLabel from '../general/ProfileLabel';
import InputDescription from '@/components/general/InputDesciption';
import { ErrorMessage } from '@/components/styled/ErrorMessage';
import SubmitButton from '@/components/general/SubmitButton';
import CancelButton from '@/components/general/CancelButton';

const ImageForm = () => {
  const {
    register,
    handleSubmit,
    formState: { isSubmitting, errors },
  } = useForm<TImageSchema>({ resolver: zodResolver(ImageSchema) });

  const { error } = useAppSelector(selectPutProfileImageState);

  const dispatch = useAppDispatch();

  const handleModalClose = (): void => {
    dispatch(closeModal());
  };

  const handleFormSubmit = async (formData: TImageSchema): Promise<void> => {
    try {
      const response = await dispatch(
        putProfileImage(formData.image as File),
      ).unwrap();

      if (response) {
        dispatch(
          addPushNotification(
            'profile image updated successfully',
            PushNotificationType.SUCCESS,
          ),
        );
        dispatch(closeModal());
      }
    } catch (err) {
      dispatch(
        addPushNotification(
          (err as ErrorData).message,
          PushNotificationType.ERROR,
        ),
      );
      dispatch(closeModal());
    }
  };

  const isSubmitDisabled = isSubmitting;

  return (
    <FormWrapper>
      <S.Form onSubmit={handleSubmit(handleFormSubmit)}>
        <S.InputWrapper>
          <ProfileLabel htmlFor="edit-profile-image">
            Upload Image:
          </ProfileLabel>
          <S.StyledInputFile
            {...register('image')}
            id="edit-profile-image"
            type="file"
          />
          <InputDescription>Your profile image</InputDescription>
          <ErrorMessage $isVisible={Boolean(errors.image)}>
            {errors.image?.message as string}
          </ErrorMessage>
        </S.InputWrapper>
        <ErrorMessage $isVisible={Boolean(error)}>
          An error has occurred while submitting the form
        </ErrorMessage>
        <S.ControlsWrapper>
          <CancelButton onClick={handleModalClose} type="button">
            Cancel
          </CancelButton>
          <SubmitButton disabled={isSubmitDisabled} type="submit">
            Save Image
          </SubmitButton>
        </S.ControlsWrapper>
      </S.Form>
    </FormWrapper>
  );
};

export default ImageForm;
