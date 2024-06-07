import { useLocation } from 'react-router-dom';

import {
  ContentPadding,
  ContentWrapper,
  StyledLink,
  StyledTabItem,
  Wrapper,
} from './ProfileTabs.styled';
import {
  BsBookmark,
  BsPencilSquare,
  BsPersonDash,
  BsPersonPlus,
} from 'react-icons/bs';
import AppIcon from '@/components/general/AppIcon';

const ProfileTabs = () => {
  const location = useLocation();

  const endpoint = location.pathname.split('/').pop();

  return (
    <Wrapper>
      <ContentWrapper>
        <StyledLink to="/profile/bookmarks">
          <StyledTabItem isSelected={endpoint === 'bookmarks'}>
            <AppIcon>
              <BsBookmark />
            </AppIcon>
            Bookmarks
          </StyledTabItem>
        </StyledLink>
        <StyledLink to="/profile/your-posts">
          <StyledTabItem isSelected={endpoint === 'your-posts'}>
            <AppIcon>
              <BsPencilSquare />
            </AppIcon>
            Your Posts
          </StyledTabItem>
        </StyledLink>
        <StyledLink to="/profile/followed-users">
          <StyledTabItem isSelected={endpoint === 'followed-users'}>
            <AppIcon>
              <BsPersonPlus />
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
      </ContentWrapper>
      <ContentPadding></ContentPadding>
    </Wrapper>
  );
};

export default ProfileTabs;
