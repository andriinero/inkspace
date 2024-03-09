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
} from './Header.styled';
import AppIcon from '@/components/icons/AppIcon';

const Header = () => {
  const isAuthenticated = useAppSelector(selectIsAuthenticated);

  const dispatch = useAppDispatch();

  const handleLogoClick = (): void => {
    dispatch(clearTopic());
  };

  const handleLogoutClick = (): void => {
    dispatch(logout());
  };

  return (
    <Wrapper>
      <StyledLink to="/">
        <Logo onClick={handleLogoClick}>Well-done</Logo>
      </StyledLink>
      <ProfileWrapper>
        {isAuthenticated ? (
          <>
            <NewPostButton>
              <StyledLink to="/create-post">
                <AppIcon src="/post.svg" alt="Create New Post Icon" />
                <NewPostButtonText>Write</NewPostButtonText>
              </StyledLink>
            </NewPostButton>
            <StyledLink to="/profile">
              <ProfileIcon src="/portrait-placeholder.png" alt="Create New Post Icon" />
            </StyledLink>
            <StyledLink reloadDocument to="/">
              <HeaderButton onClick={handleLogoutClick} type='button' value="Logout" />
            </StyledLink>
          </>
        ) : (
          <StyledLink to="/login">
            <HeaderButton type="button" value="Login" />
          </StyledLink>
        )}
      </ProfileWrapper>
    </Wrapper>
  );
};

export default Header;
