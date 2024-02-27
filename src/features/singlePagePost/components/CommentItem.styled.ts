import PostDate from '@/components/general/PostDate';
import { NavLink } from 'react-router-dom';
import styled from 'styled-components';

export const Wrapper = styled.li`
  display: flex;
  justify-content: center;
  flex-direction: column;
  gap: 0.5rem;
`;

export const Header = styled.h3`
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

export const StyledLink = styled(NavLink)`
  color: inherit;
  text-decoration: none;
`;

export const AuthorName = styled.span`
  font-size: 0.9rem;
`;

export const CommentDate = styled(PostDate)`
  font-weight: 300;
  font-size: 0.8rem;
`;

export const Body = styled.p`
  font-size: 0.9rem;
`;

export const Bottom = styled.div``;
