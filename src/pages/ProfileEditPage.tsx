import { useAppDispatch, useAppSelector } from "@/app/hooks";
import { AppDate } from "@/lib/AppDate";
import { Navigate, Outlet } from "react-router-dom";

import { selectIsAuthenticated } from "@/features/auth/authSlice";
import { selectProfileData } from "@/features/profile/profileSlice";

import { FadeIn } from "@/styles/animations/FadeIn";

import Dialog from "@/components/general/Dialog";
import {
  closeModal,
  openModal,
  selectIsProfileModalOpen,
} from "@/features/profile/profileSlice";
import * as S from "./ProfileEditPage.styled";

const ProfileEditPage = () => {
  const isAuthenticated = useAppSelector(selectIsAuthenticated);
  const isModalOpen = useAppSelector(selectIsProfileModalOpen);

  const profileData = useAppSelector(selectProfileData);

  const dispatch = useAppDispatch();

  if (!isAuthenticated || !profileData) return <Navigate to="/" />;

  const handleModalOpen = (): void => {
    dispatch(openModal());
  };

  const handleModalClose = (): void => {
    dispatch(closeModal());
  };

  const signUpDate = AppDate.getMedDate(profileData.sign_up_date);

  return (
    <S.Wrapper
      initial={FadeIn.hidden}
      animate={FadeIn.visible}
      transition={FadeIn.transition}
    >
      <S.WrapperMain>
        <Dialog isModalOpen={isModalOpen} onModalClose={handleModalClose}>
          <Outlet />
        </Dialog>
        <S.Header>Edit Profile</S.Header>
        <S.ContentWrapper>
          <S.StyledLink onClick={handleModalOpen} to="/profile/edit/email">
            <S.FormGroupWrapper>
              <S.FieldTitle>Email address</S.FieldTitle>
              <S.FieldValue>{profileData.email}</S.FieldValue>
            </S.FormGroupWrapper>
          </S.StyledLink>
          <S.StyledLink onClick={handleModalOpen} to="/profile/edit/username">
            <S.FormGroupWrapper>
              <S.FieldTitle>Username</S.FieldTitle>
              <S.FieldValue>{profileData.username}</S.FieldValue>
            </S.FormGroupWrapper>
          </S.StyledLink>
          <S.StyledLink onClick={handleModalOpen} to="/profile/edit/bio">
            <S.FormGroupWrapper>
              <S.FieldTitle>Bio</S.FieldTitle>
              <S.FieldValue>bio...</S.FieldValue>
            </S.FormGroupWrapper>
          </S.StyledLink>
        </S.ContentWrapper>
        <S.ContentWrapper>
          <S.StyledLink onClick={handleModalOpen} to="/profile/edit/password">
            <S.FormGroupWrapper>
              <S.FieldTitle>Password</S.FieldTitle>
              <S.FieldValue>••••••••</S.FieldValue>
            </S.FormGroupWrapper>
          </S.StyledLink>
        </S.ContentWrapper>
        <S.ContentWrapper>
          <S.StyledLink onClick={handleModalOpen} to="/profile/edit/delete">
            <S.DeleteButton
              onClick={handleModalOpen}
              type="button"
              value="Delete account"
            />
          </S.StyledLink>
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
          <S.StyledLink to="/profile/edit/image">
            <S.UploadImageButton
              onClick={handleModalOpen}
              type="button"
              value="Upload Image"
            />
          </S.StyledLink>
          <S.FollowCount>
            {profileData?.followed_users.length} Following
          </S.FollowCount>
          <S.FollowCount>
            {profileData?.users_following.length} Followers
          </S.FollowCount>
          <S.SignUpDate>Member since: {signUpDate}</S.SignUpDate>
        </S.ProfileWrapper>
      </S.WrapperAside>
    </S.Wrapper>
  );
};

export default ProfileEditPage;
