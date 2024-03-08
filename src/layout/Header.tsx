import { useAppDispatch, useAppSelector } from '@/app/hooks';

import { logout, selectIsAuthenticated } from '@/features/auth/authSlice';

import {
  Wrapper,
  StyledLink,
  NewPostButton,
  ProfileWrapper,
  ProfileIcon,
  NewPostButtonText,
  Logo,
} from './Header.styled';
import ActionButton from '@/components/general/ActionButton';
import AppIcon from '@/components/icons/AppIcon';

const Header = () => {
  const isAuthenticated = useAppSelector(selectIsAuthenticated);

  const dispatch = useAppDispatch();

  const onLogoutClick = (): void => {
    dispatch(logout());
  };

  return (
    <Wrapper>
      <StyledLink to="/">
        <Logo>Well-done</Logo>
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
              <ActionButton onButtonClick={onLogoutClick} value="Logout" />
            </StyledLink>
          </>
        ) : (
          <StyledLink to="/login">
            <ActionButton onButtonClick={onLogoutClick} value="Login" />
          </StyledLink>
        )}
      </ProfileWrapper>
    </Wrapper>
  );
};

export default Header;
