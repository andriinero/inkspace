import styled from 'styled-components';

export const Icon = styled.img`
  width: 22px;
  height: 22px;

  fill: #fff;
  transition: filter 100ms;

  user-select: none;
  -webkit-user-drag: none;
  cursor: pointer;

  &:hover {
    filter: invert(75%) sepia(0%) saturate(303%) hue-rotate(333deg) brightness(102%)
      contrast(82%);
  }
`;
