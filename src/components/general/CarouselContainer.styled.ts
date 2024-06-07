import styled from 'styled-components';
import tw from 'twin.macro';

export const Wrapper = styled.div`
  ${tw`grid items-center grid-cols-[auto,1fr,auto]`}
`;

export const ContentWrapper = styled.div`
  &::-webkit-scrollbar {
    display: none;
  }
  ${tw`flex items-center gap-12 px-0.5 overflow-x-hidden`}
`;
