import styled from 'styled-components';

export const Title = styled.h2`
  display: -webkit-box;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;

  overflow: hidden;

  text-overflow: ellipsis;
  word-break: break-all;
`;
