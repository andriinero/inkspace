import styled from 'styled-components';

export const WrapperIcon = styled.img`
  width: 22px;

  fill: #fff;
  transition: filter 100ms;

  cursor: pointer;
  -webkit-user-drag: none;
  user-select: none;

  &:hover {
    filter: invert(75%) sepia(0%) saturate(303%) hue-rotate(333deg) brightness(102%)
      contrast(82%);
  }
`;
