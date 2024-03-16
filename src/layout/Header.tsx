import { useNavigate } from 'react-router-dom';
import { useAppDispatch, useAppSelector } from '@/app/hooks';

import { clearTopic } from '@/features/postList/postListSlice';
import { logout, selectIsAuthenticated } from '@/features/auth/authSlice';

import {
  Wrapper,
  StyledLink,
  NewPostButton,
  ProfileWrapper,
  ProfileIcon,
  NewPostButtonText,
  Logo,
  HeaderButton,
  StyledAppIcon,
} from './Header.styled';
import { ButtonInteraction } from '@/styles/animations/ButtonInteraction';
import { selectProfileImageId } from '@/features/profile/profileSlice';

const Header = () => {
  const navigate = useNavigate();

  const isAuthenticated = useAppSelector(selectIsAuthenticated);
  const profileImageId = useAppSelector(selectProfileImageId);

  const dispatch = useAppDispatch();

  const handleLogoClick = (): void => {
    dispatch(clearTopic());
    navigate('/');
  };

  const handleLoginClick = (): void => {
    navigate('/login');
  };

  const handleLogoutClick = (): void => {
    dispatch(logout());
    location.reload();
  };

  return (
    <Wrapper>
      <Logo whileHover={{ x: -1, y: -1 }} onClick={handleLogoClick}>
        Well-done
      </Logo>
      <ProfileWrapper>
        {isAuthenticated ? (
          <>
            <NewPostButton>
              <StyledLink to="/create-post">
                <StyledAppIcon src="/post.svg" alt="Create New Post Icon" />
                <NewPostButtonText>Write</NewPostButtonText>
              </StyledLink>
            </NewPostButton>
            <StyledLink to="/profile">
              <ProfileIcon
                imageId={profileImageId}
                altText="Current User Profile Picture"
              />
            </StyledLink>
            <HeaderButton
              whileTap={ButtonInteraction.whileTap.animation}
              onClick={handleLogoutClick}
              type="button"
              value="Logout"
            />
          </>
        ) : (
          <HeaderButton
            whileTap={ButtonInteraction.whileTap.animation}
            onClick={handleLoginClick}
            type="button"
            value="Login"
          />
        )}
      </ProfileWrapper>
    </Wrapper>
  );
};

export default Header;
