import { useAppDispatch, useAppSelector } from '@/app/hooks';

import { logout, selectIsAuthenticated } from '@/features/auth/authSlice';

import {
  Wrapper,
  HeaderLink,
  NewPostButton,
  NewPostIcon,
  ProfileWrapper,
  ProfileIcon,
  NewPostButtonText,
  Logo,
} from './Header.styled';
import ActionButton from '@/components/general/ActionButton';

const Header = () => {
  const isAuthenticated = useAppSelector(selectIsAuthenticated);

  const dispatch = useAppDispatch();

  const onLogoutClick = (): void => {
    dispatch(logout());
  };

  return (
    <Wrapper>
      <HeaderLink to="/">
        <Logo>Well-done</Logo>
      </HeaderLink>
      <ProfileWrapper>
        {isAuthenticated ? (
          <>
            <NewPostButton>
              <HeaderLink to="/create-post">
                <NewPostIcon src="/post.svg" />
                <NewPostButtonText>Write</NewPostButtonText>
              </HeaderLink>
            </NewPostButton>
            <ProfileIcon src="/portrait-placeholder.png" />
            <HeaderLink reloadDocument to="/">
              <ActionButton onButtonClick={onLogoutClick} value="Logout" />
            </HeaderLink>
          </>
        ) : (
          <HeaderLink to="/login">
            <ActionButton onButtonClick={onLogoutClick} value="Login" />
          </HeaderLink>
        )}
      </ProfileWrapper>
    </Wrapper>
  );
};

export default Header;
