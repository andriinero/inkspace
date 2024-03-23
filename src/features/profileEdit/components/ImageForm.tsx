import { useForm } from 'react-hook-form';
import { useAppDispatch, useAppSelector } from '@/app/hooks';

import { putProfileImage, selectPutProfileImageState } from '../profileEditSlice';

import * as S from './ImageForm.styled';
import { useNavigate } from 'react-router-dom';

const ImageForm = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const { isLoading, error } = useAppSelector(selectPutProfileImageState);

  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  const handleFormSubmit = async (): Promise<void> => {
    if (!isLoading) {
      const response = await dispatch(putProfileImage('NULL')).unwrap();

      if (response) navigate('/');
    }
  };

  return (
    <S.Form onSubmit={handleSubmit(handleFormSubmit)}>
      <S.InputItem>
        <S.StyledInputLabel htmlFor="profile-image-upload">
          Upload Image:
        </S.StyledInputLabel>
        <S.StyledInputFile
          {...register('image', { required: 'Image is required' })}
          id="profile-image-upload"
          type="file"
        />
        <S.StyledErrorMessage $isVisible={Boolean(errors.image)}>
          {errors.root?.message}
        </S.StyledErrorMessage>
      </S.InputItem>
      <S.StyledErrorMessage $isVisible={Boolean(error)}>
        An error has occurred while submitting the form
      </S.StyledErrorMessage>
      <S.SaveButton type="submit" value="Save Image" />
    </S.Form>
  );
};

export default ImageForm;
