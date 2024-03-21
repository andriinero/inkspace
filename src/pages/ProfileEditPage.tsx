import { useAppDispatch, useAppSelector } from '@/app/hooks';
import { Navigate } from 'react-router-dom';

import { selectIsAuthenticated } from '@/features/auth/authSlice';
import { selectProfileData } from '@/features/profile/profileSlice';

import * as S from './ProfileEditPage.styled';
import { useForm } from 'react-hook-form';

const ProfileEditPage = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const isAuthenticated = useAppSelector(selectIsAuthenticated);

  const profileData = useAppSelector(selectProfileData);

  const dispatch = useAppDispatch();

  if (!isAuthenticated) return <Navigate to="/" />;

  const handleFormSubmit = async (): Promise<void> => {};

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
              value={profileData?.username}
            />
          </S.InputItem>
          <S.InputItem>
            <S.StyledInputLabel htmlFor="edit-email">Email</S.StyledInputLabel>
            <S.StyledInputText
              {...register('email', { required: 'Email is required' })}
              id="edit-email"
              type="text"
              value={profileData?.email}
            />
          </S.InputItem>
          <S.InputItem>
            <S.StyledInputLabel htmlFor="edit-password">Password</S.StyledInputLabel>
            <S.StyledInputText
              {...register('password', { required: 'Password is required' })}
              id="edit-password"
              type="password"
              placeholder="••••••••"
            />
          </S.InputItem>
          <S.InputItem>
            <S.StyledInputLabel htmlFor="edit-bio">Bio</S.StyledInputLabel>
            <S.StyledInputTextArea
              {...register('bio', { required: 'Bio is required' })}
              id="edit-bio"
              value={profileData?.bio}
            />
          </S.InputItem>
        </S.InputContainer>
        <S.SubmitButton type="submit" />
      </S.Form>
    </S.Wrapper>
  );
};

export default ProfileEditPage;
