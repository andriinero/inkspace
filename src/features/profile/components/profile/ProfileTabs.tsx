import { useLocation } from 'react-router-dom';

import { StyledLink, StyledTabItem, Wrapper } from './ProfileTabs.styled';
import {
  BsBookmarkFill,
  BsFileFill,
  BsPersonDash,
  BsPersonHeart,
} from 'react-icons/bs';
import AppIcon from '@/components/general/AppIcon';

const ProfileTabs = () => {
  const location = useLocation();

  const endpoint = location.pathname.split('/').pop();

  return (
    <Wrapper>
      <StyledLink to="/profile/bookmarks">
        <StyledTabItem isSelected={endpoint === 'bookmarks'}>
          <AppIcon>
            <BsBookmarkFill />
          </AppIcon>
          Bookmarks
        </StyledTabItem>
      </StyledLink>
      <StyledLink to="/profile/your-posts">
        <StyledTabItem isSelected={endpoint === 'your-posts'}>
          <AppIcon>
            <BsFileFill />
          </AppIcon>
          Your Posts
        </StyledTabItem>
      </StyledLink>
      <StyledLink to="/profile/followed-users">
        <StyledTabItem isSelected={endpoint === 'followed-users'}>
          <AppIcon>
            <BsPersonHeart />
          </AppIcon>
          Followed Users
        </StyledTabItem>
      </StyledLink>
      <StyledLink to="/profile/ignored-users">
        <StyledTabItem isSelected={endpoint === 'ignored-users'}>
          <AppIcon>
            <BsPersonDash />
          </AppIcon>
          Ignored Users
        </StyledTabItem>
      </StyledLink>
    </Wrapper>
  );
};

export default ProfileTabs;
