import { useAppDispatch, useAppSelector } from '@/app/hooks';
import { Navigate, useNavigate } from 'react-router-dom';

import { selectIsAuthenticated } from '@/features/auth/authSlice';
import {
  putProfileData,
  selectProfileData,
  selectPutProfileDataState,
} from '@/features/profile/profileSlice';

import * as S from './ProfileEditPage.styled';
import { useForm } from 'react-hook-form';
import {
  ProfileEditSchema,
  TProfileEditSchema,
} from '@/types/formSchemas/ProfileEditSchema';
import { zodResolver } from '@hookform/resolvers/zod';
import { StyledErrorMessage } from './CreatePost.styled';
import { DateTime } from 'luxon';

const ProfileEditPage = () => {
  const isAuthenticated = useAppSelector(selectIsAuthenticated);

  const profileData = useAppSelector(selectProfileData);
  const { isLoading, error } = useAppSelector(selectPutProfileDataState);

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
    if (!isLoading) {
      const response = await dispatch(putProfileData(formData)).unwrap();

      if (response) navigate('/');
    }
  };

  const signUpDate = DateTime.fromISO(profileData?.sign_up_date as string).toLocaleString(
    DateTime.DATE_MED
  );

  return (
    <S.Wrapper>
      <S.WrapperMain>
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
            </S.InputGroup>
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
          <S.StyledErrorMessage $isVisible={Boolean(error)}>
            An error has occurred while submitting the form
          </S.StyledErrorMessage>
          <S.SubmitButton type="submit" />
        </S.Form>
      </S.WrapperMain>
      <S.WrapperAside>
        <S.ProfileWrapper>
          <S.ProfileIcon imageId={profileData.profile_image} altText="Profile Icon" />
          <S.StyledUserName>{profileData?.username}</S.StyledUserName>
          <S.FollowCount>{profileData?.followed_users.length} Following</S.FollowCount>
          <S.FollowCount>{profileData?.users_following.length} Followers</S.FollowCount>
          <S.SignUpDate>Member since: {signUpDate}</S.SignUpDate>
        </S.ProfileWrapper>
      </S.WrapperAside>
    </S.Wrapper>
  );
};

export default ProfileEditPage;
