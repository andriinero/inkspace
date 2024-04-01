import { useLocation } from 'react-router-dom';

import { StyledLink, StyledTabItem, Wrapper } from './ProfileTabs.styled';

const ProfileTabs = () => {
  const location = useLocation();

  const endpoint = location.pathname.split('/').pop();

  return (
    <Wrapper>
      <StyledLink to="/profile/bookmarks">
        <StyledTabItem isSelected={endpoint === 'bookmarks'}>
          Your Bookmarks
        </StyledTabItem>
      </StyledLink>
      <StyledLink to="/profile/your-posts">
        <StyledTabItem isSelected={endpoint === 'your-posts'}>Your Posts</StyledTabItem>
      </StyledLink>
      <StyledLink to="/profile/followed-users">
        <StyledTabItem isSelected={endpoint === 'followed-users'}>
          Followed Users
        </StyledTabItem>
      </StyledLink>
      <StyledLink to="/profile/ignored-users">
        <StyledTabItem isSelected={endpoint === 'ignored-users'}>
          Ignored Users
        </StyledTabItem>
      </StyledLink>
    </Wrapper>
  );
};

export default ProfileTabs;
