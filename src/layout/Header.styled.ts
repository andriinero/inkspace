import styled from 'styled-components';
import { Link } from 'react-router-dom';

export const Wrapper = styled.header`
  grid-area: header;
  display: flex;
  justify-content: space-between;
  align-items: center;

  padding: 1rem;
  border-bottom: 1px solid ${({ theme }) => theme.color.border};
`;

export const StyledLink = styled(Link)`
  color: ${({ theme }) => theme.color.text_clr_primary};
  font-size: 1.5rem;
  font-weight: 500;
  text-decoration: none;
  text-transform: uppercase;
`;

export const ProfileWrapper = styled.div`
  display: flex;
  gap: 2rem;
`;

export const PostButton = styled.div`
  display: flex;
  align-items: center;
  gap: 0.5rem;

  transition: filter 100ms;

  cursor: pointer;

  &:hover {
    filter: invert(75%) sepia(0%) saturate(303%) hue-rotate(333deg) brightness(102%)
      contrast(82%);
  }
`;

export const PostIcon = styled.img`
  width: 28px;
`;

export const ButtonText = styled.span``;

export const ProfileIcon = styled.img`
  width: 40px;
  border-radius: 50%;

  cursor: pointer;
`;
