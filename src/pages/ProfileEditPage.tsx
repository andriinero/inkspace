import { useAppDispatch, useAppSelector } from '@/app/hooks';
import { Navigate, useNavigate } from 'react-router-dom';

import { selectIsAuthenticated } from '@/features/auth/authSlice';
import { putProfileData, selectProfileData } from '@/features/profile/profileSlice';

import * as S from './ProfileEditPage.styled';
import { useForm } from 'react-hook-form';
import {
  ProfileEditSchema,
  TProfileEditSchema,
} from '@/types/formSchemas/ProfileEditSchema';
import { zodResolver } from '@hookform/resolvers/zod';
import { StyledErrorMessage } from './CreatePost.styled';

const ProfileEditPage = () => {
  const isAuthenticated = useAppSelector(selectIsAuthenticated);
  const profileData = useAppSelector(selectProfileData);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<TProfileEditSchema>({
    defaultValues: {
      username: profileData?.username,
      password: '',
      email: profileData?.email,
      bio: profileData?.bio,
    },
    resolver: zodResolver(ProfileEditSchema),
  });

  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  if (!isAuthenticated || !profileData) return <Navigate to="/" />;

  const handleFormSubmit = async (formData: TProfileEditSchema): Promise<void> => {
    const response = await dispatch(putProfileData(formData)).unwrap();

    if (response) navigate('/');
  };

  return (
    <S.Wrapper>
      <S.Header>{profileData?.username}</S.Header>
      <S.Form onSubmit={handleSubmit(handleFormSubmit)}>
        <S.InputContainer>
          <S.InputItem>
            <S.StyledInputLabel htmlFor="edit-username">Username</S.StyledInputLabel>
            <S.StyledInputText
              {...register('username', { required: 'Username is required' })}
              id="edit-username"
              type="text"
            />
            <StyledErrorMessage $isVisible={Boolean(errors.username)}>
              {errors.username?.message}
            </StyledErrorMessage>
          </S.InputItem>
          <S.InputItem>
            <S.StyledInputLabel htmlFor="edit-email">Email</S.StyledInputLabel>
            <S.StyledInputText
              {...register('email', { required: 'Email is required' })}
              id="edit-email"
              type="text"
            />
            <StyledErrorMessage $isVisible={Boolean(errors.email)}>
              {errors.email?.message}
            </StyledErrorMessage>
          </S.InputItem>
          <S.InputItem>
            <S.StyledInputLabel htmlFor="edit-password">Password</S.StyledInputLabel>
            <S.StyledInputText
              {...register('password', { required: 'Password is required' })}
              id="edit-password"
              type="password"
              placeholder="••••••••"
            />
            <StyledErrorMessage $isVisible={Boolean(errors.password)}>
              {errors.password?.message}
            </StyledErrorMessage>
          </S.InputItem>
          <S.InputItem>
            <S.StyledInputLabel htmlFor="edit-bio">Bio</S.StyledInputLabel>
            <S.StyledInputTextArea
              {...register('bio', { required: 'Bio is required' })}
              id="edit-bio"
              cols={45}
              rows={5}
            />
          </S.InputItem>
          <StyledErrorMessage $isVisible={Boolean(errors.bio)}>
            {errors.bio?.message}
          </StyledErrorMessage>
        </S.InputContainer>
        <S.SubmitButton type="submit" />
      </S.Form>
    </S.Wrapper>
  );
};

export default ProfileEditPage;
