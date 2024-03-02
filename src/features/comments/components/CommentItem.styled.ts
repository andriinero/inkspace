import PostDate from '@/components/general/PostDate';
import { NavLink } from 'react-router-dom';
import styled from 'styled-components';

export const Wrapper = styled.li`
  display: flex;
  justify-content: center;
  flex-direction: column;
  gap: 0.5rem;
`;

export const StyledLink = styled(NavLink)`
  color: inherit;
  text-decoration: none;
`;

export const Header = styled.h3`
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

export const WrapperAuthor = styled.div`
  display: flex;
  align-items: center;
  gap: 0.5rem;
`;

export const WrapperInfo = styled.div`
  display: flex;
  flex-direction: column;

  font-size: 1rem;
  font-weight: 400;
`;

export const AuthorIcon = styled.img`
  width: 24px;
  height: 24px;
  border-radius: 50%;
`;

export const AuthorName = styled.span`
  font-weight: 300;
  font-size: 0.9rem;
`;

export const DeleteIcon = styled.img`
  width: 22px;
  height: auto;

  fill: #fff;
  transition: filter 100ms;

  cursor: pointer;

  &:hover {
    filter: invert(75%) sepia(0%) saturate(303%) hue-rotate(333deg) brightness(102%)
      contrast(82%);
  }
`;

export const CommentDate = styled(PostDate)`
  font-weight: 300;
  font-size: 0.8rem;
`;

export const Body = styled.p`
  font-size: 0.9rem;
  overflow-wrap: break-word;
`;

export const Bottom = styled.div``;
