import { useRef, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { useAppDispatch, useAppSelector } from '@/app/hooks';
import useCloseDropdown from '@/hooks/useCloseDropdown';
import useTestUserLogin from '@/features/auth/hooks/useTestUserLogin';

import { selectProfileImageId } from '@/features/profile/profileSlice';
import { clearTopic } from '@/features/postList/postListSlice';
import { logout, selectIsAuthenticated } from '@/features/auth/authSlice';
import { openSignUpModal, openLoginModal } from '@/features/auth/authSlice';
import { exitEditMode } from '@/features/postForm/postFormSlice';

import LoginForm from '@/features/auth/components/LoginForm';
import SignUpForm from '@/features/auth/components/SignUpForm';
import PushNotificationContainer from '@/features/pushNotification/components/PushNotificationContainer';
import * as S from './Header.styled';
import AppIcon from '@/components/general/AppIcon';
import {
  BsArrowBarLeft,
  BsPencil,
  BsPencilSquare,
  BsPerson,
} from 'react-icons/bs';

const Header = () => {
  const { pathname } = useLocation();

  const [isMenuOpen, setIsMenuOpen] = useState<boolean>(false);

  const dropdownRef = useRef<HTMLUListElement>(null);

  const isAuthenticated = useAppSelector(selectIsAuthenticated);
  const profileImageId = useAppSelector(selectProfileImageId);

  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  const handleTestUserLogin = useTestUserLogin();

  const handleOpenMenu = (): void => {
    setIsMenuOpen(true);
  };

  const handleCloseMenu = (): void => {
    setIsMenuOpen(false);
  };

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
        <S.Logo
          whileHover={{ x: -1, y: -1 }}
          onClick={handleLogoClick}
          src="/inkspace-black.png"
        />
        <S.ProfileWrapper>
          {isAuthenticated ? (
            <>
              {pathname !== '/post-form' && (
                <>
                  <S.NewPostButton onClick={handleWritePostClick}>
                    <AppIcon>
                      <BsPencilSquare />
                    </AppIcon>
                    <S.NewPostButtonText>Write</S.NewPostButtonText>
                  </S.NewPostButton>
                  <S.ProfileIcon
                    onClick={handleOpenMenu}
                    imageId={profileImageId}
                    placeholderSrc="/portrait-placeholder.png"
                    altText="Current User Profile Picture"
                  />
                  <S.StyledDropdown isOpen={isMenuOpen} innerRef={dropdownRef}>
                    <S.StyledMenuItem onClick={handleProfileClick}>
                      <AppIcon>
                        <BsPerson />
                      </AppIcon>
                      Profile
                    </S.StyledMenuItem>
                    <S.StyledMenuItem onClick={handleEditProfileClick}>
                      <AppIcon>
                        <BsPencil />
                      </AppIcon>
                      Edit Profile
                    </S.StyledMenuItem>
                    <S.StyledMenuItem onClick={handleLogoutClick}>
                      <AppIcon>
                        <BsArrowBarLeft />
                      </AppIcon>
                      Logout
                    </S.StyledMenuItem>
                  </S.StyledDropdown>
                </>
              )}
            </>
          ) : (
            <S.ControlsWrapper>
              <S.HeaderButton
                onClick={handleSignUpClick}
                type="button"
                value="Sign Up"
              />
              <S.HeaderButton
                onClick={handleLoginClick}
                type="button"
                value="Login"
              />
              <S.HeaderButton
                onClick={handleTestUserLogin}
                type="button"
                value="Log In As Test User"
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
