import styled from 'styled-components';
import PostDate from '@/components/general/TimeAgo';
import { NavLink } from 'react-router-dom';
import TimeAgo from '@/components/general/TimeAgo';
import AppIcon from '@/components/icons/AppIcon';
import { Username } from '@/styles/components/Username.styled';

export const Wrapper = styled.li`
  display: flex;
  justify-content: center;
  flex-direction: column;
  gap: 0.7rem;

  padding: 1.5rem 0.5rem;
  border-bottom: 1px solid ${({ theme }) => theme.color.comments_border};

  &:last-child {
    border-bottom: 1px solid transparent;
  }
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
  gap: 0.7rem;
`;

export const WrapperInfo = styled.div`
  display: flex;
  flex-direction: column;
  gap: 0.2rem;

  font-size: 1rem;
  font-weight: 400;
`;

export const AuthorIcon = styled.img`
  width: 32px;
  height: 32px;
  border-radius: 50%;
`;

export const StyledUsername = styled(Username)`
  font-weight: 300;
  font-size: 0.9rem;
`;

export const ControlsWrapper = styled.div`
  display: flex;
  gap: 0.5rem;
`;

export const ControlsIcon = styled(AppIcon)`
  width: 20px;
  height: 20px;
`;

export const EditIcon = styled(ControlsIcon)`
  width: 18px;
`;

export const CommentDate = styled(PostDate)`
  font-weight: 300;
  font-size: 0.8rem;
`;

export const Body = styled.p`
  font-size: 0.9rem;
  line-height: 1.5rem;
  overflow-wrap: break-word;
`;

export const EditDate = styled(TimeAgo)`
  display: block;
  align-self: flex-end;

  font-size: 0.7rem;
  font-weight: 300;
  font-style: italic;
  letter-spacing: 0.04rem;
`;
