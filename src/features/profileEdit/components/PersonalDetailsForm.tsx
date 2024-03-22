import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { useNavigate } from 'react-router-dom';
import { useAppDispatch, useAppSelector } from '@/app/hooks';

import { selectProfileData } from '@/features/profile/profileSlice';
import { putPersonalDetails, selectPutPersonalDetailsState } from '../profileEditSlice';

import {
  ProfileDataEditSchema,
  TProfileDataEditSchema,
} from '@/types/formSchemas/ProfileDataEditSchema';

import * as S from './PersonalDetailsForm.styled';

const PersonalDetailsForm = () => {
  const profileData = useAppSelector(selectProfileData);
  const { isLoading, error } = useAppSelector(selectPutPersonalDetailsState);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<TProfileDataEditSchema>({
    defaultValues: {
      username: profileData?.username,
      email: profileData?.email,
      bio: profileData?.bio,
    },
    resolver: zodResolver(ProfileDataEditSchema),
  });

  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  const handleFormSubmit = async (formData: TProfileDataEditSchema): Promise<void> => {
    if (!isLoading) {
      const response = await dispatch(putPersonalDetails(formData)).unwrap();

      if (response) navigate('/');
    }
  };

  return (
    <S.Form onSubmit={handleSubmit(handleFormSubmit)}>
      <S.InputContainer>
        <S.InputGroup>
          <S.InputItem>
            <S.StyledInputLabel htmlFor="edit-username">Username</S.StyledInputLabel>
            <S.StyledInputText
              {...register('username', { required: 'Username is required' })}
              id="edit-username"
              type="text"
            />
            <S.StyledErrorMessage $isVisible={Boolean(errors.username)}>
              {errors.username?.message}
            </S.StyledErrorMessage>
          </S.InputItem>
          <S.InputItem>
            <S.StyledInputLabel htmlFor="edit-email">Email</S.StyledInputLabel>
            <S.StyledInputText
              {...register('email', { required: 'Email is required' })}
              id="edit-email"
              type="text"
            />
            <S.StyledErrorMessage $isVisible={Boolean(errors.email)}>
              {errors.email?.message}
            </S.StyledErrorMessage>
          </S.InputItem>
        </S.InputGroup>
        <S.InputItem>
          <S.StyledInputLabel htmlFor="edit-bio">Bio</S.StyledInputLabel>
          <S.StyledInputTextArea
            {...register('bio', { required: 'Bio is required' })}
            id="edit-bio"
            cols={45}
            rows={5}
          />
        </S.InputItem>
        <S.StyledErrorMessage $isVisible={Boolean(errors.bio)}>
          {errors.bio?.message}
        </S.StyledErrorMessage>
      </S.InputContainer>
      <S.StyledErrorMessage $isVisible={Boolean(error)}>
        An error has occurred while submitting the form
      </S.StyledErrorMessage>
      <S.SaveButton type="submit" value="Save" />
    </S.Form>
  );
};

export default PersonalDetailsForm;
