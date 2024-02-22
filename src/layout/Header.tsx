import {
  Wrapper,
  HeaderLink,
  PostButton,
  PostIcon,
  ProfileWrapper,
  ProfileIcon,
  ButtonText,
  Logo,
} from './Header.styled';

const Header = () => {
  return (
    <Wrapper>
      <HeaderLink to="/">
        <Logo>Well-done</Logo>
      </HeaderLink>
      <ProfileWrapper>
        <PostButton>
          <HeaderLink to="/new-post">
            <PostIcon src="/post.svg" />
          </HeaderLink>
          <ButtonText>Write</ButtonText>
        </PostButton>
        <ProfileIcon src="/portrait-placeholder.png" />
      </ProfileWrapper>
    </Wrapper>
  );
};

export default Header;
