import { useAppDispatch, useAppSelector } from '@/app/hooks';
import {
  Wrapper,
  HeaderLink,
  PostButton,
  PostIcon,
  ProfileWrapper,
  ProfileIcon,
  ButtonText,
  Logo,
  LoginButton,
  LogoutButton,
} from './Header.styled';
import { logout, selectAuthData } from '@/features/auth/authSlice';

const Header = () => {
  const authData = useAppSelector(selectAuthData);

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
        <PostButton>
          <HeaderLink to="/new-post">
            <PostIcon src="/post.svg" />
            <ButtonText>Write</ButtonText>
          </HeaderLink>
        </PostButton>
        {authData ? (
          <>
            <ProfileIcon src="/portrait-placeholder.png" />
            <HeaderLink to="/">
              <LogoutButton onClick={onLogoutClick} type="button" value="Logout" />
            </HeaderLink>
          </>
        ) : (
          <HeaderLink to="/login">
            <LoginButton type="button" value="Login" />
          </HeaderLink>
        )}
      </ProfileWrapper>
    </Wrapper>
  );
};

export default Header;
