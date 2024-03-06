import styled from 'styled-components';

export const Wrapper = styled.div`
  display: flex;
  flex-direction: column;

  padding: 1rem 0;
`;

export const Header = styled.h1`
  display: flex;
  align-items: center;
  align-self: flex-end;
  gap: 1rem;

  padding-top: 2rem;

  font-weight: 100;
  font-style: italic;
`;

export const StyledIcon = styled.img`
  width: 16px;

  fill: #fff;
  transition: filter 100ms;

  cursor: pointer;

  &:hover {
    filter: invert(75%) sepia(0%) saturate(303%) hue-rotate(333deg) brightness(102%)
      contrast(82%);
  }
`;
