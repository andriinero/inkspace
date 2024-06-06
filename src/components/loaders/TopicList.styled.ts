import styled from 'styled-components';
import tw from 'twin.macro';

export const Item = styled.div`
  width: 9ch;
  height: 4ch;
  background-color: ${({ theme }) => theme.color.loader_bg};
  ${tw`bg-gray-50 animate-pulse rounded-full`}
`;
