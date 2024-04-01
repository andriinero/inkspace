import { useLocation, useNavigate } from 'react-router-dom';
import { useAppDispatch, useAppSelector } from '@/app/hooks';

import { selectProfileImageId } from '@/features/profile/profileSlice';
import { clearTopic } from '@/features/postList/postListSlice';
import { logout, selectIsAuthenticated } from '@/features/auth/authSlice';
import { openSignUpModal, openLoginModal } from '@/features/auth/authSlice';
import { exitEditMode } from '@/features/postForm/postFormSlice';

import { ButtonInteraction } from '@/styles/animations/ButtonInteraction';

import LoginForm from '@/features/auth/components/LoginForm';
import SignUpForm from '@/features/auth/components/SignUpForm';
import PushNotificationContainer from '@/features/pushNotification/components/PushNotificationContainer';
import { useRef, useState } from 'react';
import { MenuItemDanger } from '@/components/styled/MenuItem';
import * as S from './Header.styled';
import useCloseDropdown from '@/hooks/useCloseDropdown';

const Header = () => {
  const { pathname } = useLocation();

  const [isMenuOpen, setIsMenuOpen] = useState<boolean>(false);

  const dropdownRef = useRef<HTMLUListElement>(null);

  const isAuthenticated = useAppSelector(selectIsAuthenticated);
  const profileImageId = useAppSelector(selectProfileImageId);

  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  const handleOpenMenu = (): void => {
    setIsMenuOpen(true);
  };

  const handleCloseMenu = (): void => {
    setIsMenuOpen(false);
  };

  //FIXME: why here????
  useCloseDropdown(dropdownRef, handleCloseMenu);

  const handleLogoClick = (): void => {
    dispatch(clearTopic());
    navigate('/');
  };

  const handleWritePostClick = (): void => {
    dispatch(exitEditMode());
    navigate('/post-form');
  };

  const handleSignUpClick = (): void => {
    dispatch(openSignUpModal());
  };

  const handleLoginClick = (): void => {
    dispatch(openLoginModal());
  };

  const handleProfileClick = (): void => {
    navigate('/profile/bookmarks');
    setIsMenuOpen(false);
  };

  const handleEditProfileClick = (): void => {
    navigate('/profile/edit');
    setIsMenuOpen(false);
  };

  const handleLogoutClick = (): void => {
    dispatch(logout());
    location.reload();
  };

  return (
    <S.Wrapper>
      <S.ContentWrapper>
        <S.Logo whileHover={{ x: -1, y: -1 }} onClick={handleLogoClick} src="/logo.svg" />
        <S.ProfileWrapper>
          {isAuthenticated ? (
            <>
              {pathname !== '/post-form' && (
                <S.NewPostButton onClick={handleWritePostClick}>
                  <S.StyledAppIcon src="/post.svg" alt="Create New Post Icon" />
                  <S.NewPostButtonText>Write</S.NewPostButtonText>
                </S.NewPostButton>
              )}
              <S.ProfileIcon
                onClick={handleOpenMenu}
                imageId={profileImageId}
                placeholderSrc="/portrait-placeholder.png"
                altText="Current User Profile Picture"
              />
              <S.StyledDropdown isOpen={isMenuOpen} innerRef={dropdownRef}>
                <S.StyledMenuItem onClick={handleProfileClick}>Profile</S.StyledMenuItem>
                <S.StyledMenuItemSuccess onClick={handleEditProfileClick}>
                  Edit Profile
                </S.StyledMenuItemSuccess>
                <MenuItemDanger onClick={handleLogoutClick}>Logout</MenuItemDanger>
              </S.StyledDropdown>
            </>
          ) : (
            <S.ControlsWrapper>
              <S.HeaderButton
                whileTap={ButtonInteraction.whileTap.animation}
                onClick={handleSignUpClick}
                type="button"
                value="Sign Up"
              />
              <S.HeaderButton
                whileTap={ButtonInteraction.whileTap.animation}
                onClick={handleLoginClick}
                type="button"
                value="Login"
              />
            </S.ControlsWrapper>
          )}
        </S.ProfileWrapper>
        <LoginForm />
        <SignUpForm />
      </S.ContentWrapper>
      <PushNotificationContainer />
    </S.Wrapper>
  );
};

export default Header;
