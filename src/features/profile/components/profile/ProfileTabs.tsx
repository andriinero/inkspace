import { useLocation } from "react-router-dom";

import {
  StyledIcon,
  StyledLink,
  StyledTabItem,
  Wrapper,
} from "./ProfileTabs.styled";

const ProfileTabs = () => {
  const location = useLocation();

  const endpoint = location.pathname.split("/").pop();

  return (
    <Wrapper>
      <StyledLink to="/profile/bookmarks">
        <StyledTabItem isSelected={endpoint === "bookmarks"}>
          <StyledIcon src="/bookmark-outline.svg" alt="Bookmarks Icon" />
          Bookmarks
        </StyledTabItem>
      </StyledLink>
      <StyledLink to="/profile/your-posts">
        <StyledTabItem isSelected={endpoint === "your-posts"}>
          <StyledIcon src="/post.svg" alt="Posts Icon" />
          Your Posts
        </StyledTabItem>
      </StyledLink>
      <StyledLink to="/profile/followed-users">
        <StyledTabItem isSelected={endpoint === "followed-users"}>
          <StyledIcon src="/user-heart.svg" alt="Followed Users Icon Icon" />
          Followed Users
        </StyledTabItem>
      </StyledLink>
      <StyledLink to="/profile/ignored-users">
        <StyledTabItem isSelected={endpoint === "ignored-users"}>
          <StyledIcon src="/user-cross.svg" alt="Ignored Users Icon" />
          Ignored Users
        </StyledTabItem>
      </StyledLink>
    </Wrapper>
  );
};

export default ProfileTabs;
