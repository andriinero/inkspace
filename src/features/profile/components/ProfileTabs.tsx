import TabItem from '@/components/general/TabItem';
import { StyledLink, Wrapper } from './ProfileTabs.styled';
import { useLocation } from 'react-router-dom';

const ProfileTabs = () => {
  const location = useLocation();

  const endpoint = location.pathname.split('/').pop();

  return (
    <Wrapper>
      <TabItem isSelected={endpoint === 'bookmarks'}>
        <StyledLink to="/profile/bookmarks">Your Bookmarks</StyledLink>
      </TabItem>
      <TabItem isSelected={endpoint === 'your-posts'}>
        <StyledLink to="/profile/your-posts">Your Posts</StyledLink>
      </TabItem>
      <TabItem isSelected={endpoint === 'followed-users'}>
        <StyledLink to="/profile/followed-users">Followed Users</StyledLink>
      </TabItem>
      <TabItem isSelected={endpoint === 'ignored-users'}>
        <StyledLink to="/profile/ignored-users">Ignored Users</StyledLink>
      </TabItem>
    </Wrapper>
  );
};

export default ProfileTabs;
