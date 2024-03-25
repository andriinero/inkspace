import { useLocation, useNavigate } from 'react-router-dom';
import { useAppDispatch, useAppSelector } from '@/app/hooks';

import { selectProfileImageId } from '@/features/profile/profileSlice';
import { clearTopic } from '@/features/postList/postListSlice';
import { logout, selectIsAuthenticated } from '@/features/auth/authSlice';
import { openSignUpModal, openLoginModal } from '@/features/auth/authSlice';

import { ButtonInteraction } from '@/styles/animations/ButtonInteraction';

import LoginForm from '@/features/auth/components/LoginForm';
import * as S from './Header.styled';
import { exitEditMode } from '@/features/postForm/postFormSlice';
import SignUpForm from '@/features/auth/components/SignUpForm';

const Header = () => {
  const { pathname } = useLocation();

  const isAuthenticated = useAppSelector(selectIsAuthenticated);
  const profileImageId = useAppSelector(selectProfileImageId);

  const dispatch = useAppDispatch();
  const navigate = useNavigate();

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

  const handleLogoutClick = (): void => {
    dispatch(logout());
    location.reload();
  };

  return (
    <S.Wrapper>
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
            <S.StyledLink to="/profile">
              <S.ProfileIcon
                imageId={profileImageId}
                placeholderSrc="/empty.png"
                altText="Current User Profile Picture"
              />
            </S.StyledLink>
            <S.HeaderButton
              whileTap={ButtonInteraction.whileTap.animation}
              onClick={handleLogoutClick}
              type="button"
              value="Logout"
            />
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
    </S.Wrapper>
  );
};

export default Header;
