import { useForm } from 'react-hook-form';
import { useAppDispatch, useAppSelector } from '@/app/hooks';
import { useNavigate } from 'react-router-dom';
import { zodResolver } from '@hookform/resolvers/zod';

import { putProfileImage, selectPutProfileImageState } from '../profileEditSlice';

import {
  ProfileImageSchema,
  TProfileImageSchema,
} from '@/types/formSchemas/ProfileImageSchema';
import { ButtonInteraction } from '@/styles/animations/ButtonInteraction';

import * as S from './ImageForm.styled';

const ImageForm = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<TProfileImageSchema>({ resolver: zodResolver(ProfileImageSchema) });

  const { isLoading, error } = useAppSelector(selectPutProfileImageState);

  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  const handleFormSubmit = async (formData: TProfileImageSchema): Promise<void> => {
    if (!isLoading) {
      const response = await dispatch(putProfileImage(formData.image as File)).unwrap();

      if (response) navigate('/');
    }
  };

  return (
    <S.Form onSubmit={handleSubmit(handleFormSubmit)}>
      <S.InputGroup>
        <S.InputItem>
          <S.StyledInputLabel htmlFor="profile-image-upload">
            Upload Image:
          </S.StyledInputLabel>
          <S.StyledInputFile
            {...register('image', { required: 'Image is required' })}
            id="profile-image-upload"
            type="file"
          />
        </S.InputItem>
        <S.StyledErrorMessage $isVisible={Boolean(errors.image)}>
          {errors.image?.message as string}
        </S.StyledErrorMessage>
      </S.InputGroup>
      <S.StyledErrorMessage $isVisible={Boolean(error)}>
        An error has occurred while submitting the form
      </S.StyledErrorMessage>
      <S.SaveButton
        type="submit"
        value="Save Image"
        whileTap={ButtonInteraction.whileTap.animation}
      />
    </S.Form>
  );
};

export default ImageForm;
