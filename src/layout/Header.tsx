import { useAppDispatch, useAppSelector } from '@/app/hooks';
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
import { logout, selectAuthData } from '@/features/auth/authSlice';
import ActionButton from '@/components/general/ActionButton';

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
        <NewPostButton>
          <HeaderLink to="/new-post">
            <NewPostIcon src="/post.svg" />
            <NewPostButtonText>Write</NewPostButtonText>
          </HeaderLink>
        </NewPostButton>
        {authData ? (
          <>
            <ProfileIcon src="/portrait-placeholder.png" />
            <HeaderLink to="/">
              <ActionButton onButtonClick={onLogoutClick} value='Logout'/>
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
