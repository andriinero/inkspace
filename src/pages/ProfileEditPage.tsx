import { DateTime } from 'luxon';
import { useAppSelector } from '@/app/hooks';
import { Navigate } from 'react-router-dom';

import { selectIsAuthenticated } from '@/features/auth/authSlice';
import { selectProfileData } from '@/features/profile/profileSlice';

import * as S from './ProfileEditPage.styled';
import PersonalDetailsForm from '@/features/profileEdit/components/PersonalDetailsForm';
import PasswordForm from '@/features/profileEdit/components/PasswordForm';

const ProfileEditPage = () => {
  const isAuthenticated = useAppSelector(selectIsAuthenticated);

  const profileData = useAppSelector(selectProfileData);

  if (!isAuthenticated || !profileData) return <Navigate to="/" />;

  const signUpDate = DateTime.fromISO(profileData?.sign_up_date as string).toLocaleString(
    DateTime.DATE_MED
  );

  return (
    <S.Wrapper>
      <S.WrapperMain>
        <S.FormGroupWrapper>
          <S.Header>Personal Details</S.Header>
          <PersonalDetailsForm />
        </S.FormGroupWrapper>
        <S.FormGroupWrapper>
          <S.Header>Password</S.Header>
          <PasswordForm />
        </S.FormGroupWrapper>
      </S.WrapperMain>
      <S.WrapperAside>
        <S.ProfileWrapper>
          <S.ProfileIcon imageId={profileData.profile_image} altText="Profile Icon" />
          <S.StyledUserName>{profileData?.username}</S.StyledUserName>
          <S.ImageForm id="profile-image-upload">
            <S.StyledInputLabel htmlFor="edit-image">Upload Image:</S.StyledInputLabel>
            <S.ImageInput id="edit-image" type="file" />
          </S.ImageForm>
          <S.SaveImageButton
            form="profile-image-upload"
            type="submit"
            value="Save Image"
          />
          <S.FollowCount>{profileData?.followed_users.length} Following</S.FollowCount>
          <S.FollowCount>{profileData?.users_following.length} Followers</S.FollowCount>
          <S.SignUpDate>Member since: {signUpDate}</S.SignUpDate>
        </S.ProfileWrapper>
      </S.WrapperAside>
    </S.Wrapper>
  );
};

export default ProfileEditPage;
