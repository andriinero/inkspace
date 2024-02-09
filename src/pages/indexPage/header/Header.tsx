import {
  Wrapper,
  StyledLink,
  PostButton,
  PostIcon,
  ProfileWrapper,
  ProfileIcon,
  ButtonText,
} from './Header.styled';

const Header = () => {
  return (
    <Wrapper>
      <StyledLink to='/'>Well-done</StyledLink>
      <ProfileWrapper>
        <PostButton>
          <PostIcon src="/post.svg" />
          <ButtonText>Write</ButtonText>
        </PostButton>
        <ProfileIcon src="/portrait-placeholder.png" />
      </ProfileWrapper>
    </Wrapper>
  );
};

export default Header;
