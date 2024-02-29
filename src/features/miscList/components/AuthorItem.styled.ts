import styled from 'styled-components';
import { NavLink } from 'react-router-dom';

export const WrapperItem = styled.li`
  display: grid;
  grid-template-columns: auto minmax(100px, 300px) auto;
  justify-content: space-between;
  align-items: center;
  gap: 1.1rem;
`;

export const StyledLink = styled(NavLink)`
  align-self: flex-start;

  color: inherit;
`;

export const BioContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 0.4rem;
`;

export const BioName = styled.span`
  display: inline-block;

  max-width: 18ch;

  font-weight: 500;

  white-space: nowrap;
  overflow-x: hidden;
  text-overflow: ellipsis;
`;

export const BioContent = styled.p`
  display: -webkit-box;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;

  font-size: 0.8rem;
  line-height: 1.2rem;
  text-overflow: ellipsis;

  overflow: hidden;
`;

export const Icon = styled.img`
  align-self: flex-start;

  width: 32px;
  height: 32px;
  border-radius: 50%;

  -webkit-user-drag: none;
`;

export const FollowButton = styled.input`
  padding: 0.5rem 0.8rem;
  background-color: ${({ theme }) => theme.color.topic_bg};
  border: 1px solid ${({ theme }) => theme.color.topic_border};
  border-radius: 16px;

  color: ${({ theme }) => theme.color.text_primary};
  font-size: 0.85rem;

  transition: color 100ms;

  cursor: pointer;

  &:hover {
    color: ${({ theme }) => theme.color.text_secondary};
  }
`;
