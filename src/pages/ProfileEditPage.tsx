import { useAppSelector } from '@/app/hooks';
import { AppDate } from '@/lib/AppDate';
import { Navigate } from 'react-router-dom';

import { selectIsAuthenticated } from '@/features/auth/authSlice';
import { selectProfileData } from '@/features/profile/profileSlice';

import { FadeIn } from '@/styles/animations/FadeIn';

import ImageForm from '@/features/profileEdit/components/ImageForm';
import * as S from './ProfileEditPage.styled';

const ProfileEditPage = () => {
  const isAuthenticated = useAppSelector(selectIsAuthenticated);

  const profileData = useAppSelector(selectProfileData);

  if (!isAuthenticated || !profileData) return <Navigate to="/" />;

  const signUpDate = AppDate.getMedDate(profileData.sign_up_date);

  return (
    <S.Wrapper
      initial={FadeIn.hidden}
      animate={FadeIn.visible}
      transition={FadeIn.transition}
    >
      <S.WrapperMain>
        <S.Header>Edit Profile</S.Header>
        <S.ContentWrapper>
          <S.FormGroupWrapper>
            <S.FieldTitle>Email address</S.FieldTitle>
            <S.FieldValue>{profileData.email}</S.FieldValue>
          </S.FormGroupWrapper>
          <S.FormGroupWrapper>
            <S.FieldTitle>Username</S.FieldTitle>
            <S.FieldValue>{profileData.username}</S.FieldValue>
          </S.FormGroupWrapper>
          <S.FormGroupWrapper>
            <S.FieldTitle>Bio</S.FieldTitle>
            <S.FieldValue>your bio...</S.FieldValue>
          </S.FormGroupWrapper>
        </S.ContentWrapper>
        <S.ContentWrapper>
          <S.FormGroupWrapper>
            <S.FieldTitle>Password</S.FieldTitle>
            <S.FieldValue>••••••••</S.FieldValue>
          </S.FormGroupWrapper>
        </S.ContentWrapper>
        <S.ContentWrapper>
          <S.DeleteButton type="button" value="Delete account" />
        </S.ContentWrapper>
      </S.WrapperMain>
      <S.WrapperAside>
        <S.ProfileWrapper>
          <S.ProfileIcon
            imageId={profileData.profile_image}
            placeholderSrc="/portrait-placeholder.png"
            altText="Profile Icon"
          />
          <S.StyledUserName>{profileData?.username}</S.StyledUserName>
          <S.UploadImageButton type="button" value="Upload Image" />
          <S.FollowCount>{profileData?.followed_users.length} Following</S.FollowCount>
          <S.FollowCount>{profileData?.users_following.length} Followers</S.FollowCount>
          <S.SignUpDate>Member since: {signUpDate}</S.SignUpDate>
        </S.ProfileWrapper>
      </S.WrapperAside>
    </S.Wrapper>
  );
};

export default ProfileEditPage;
