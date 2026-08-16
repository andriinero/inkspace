import styled from 'styled-components';
import tw from 'twin.macro';

export const Wrapper = styled.div`
  & > * {
    ${tw`animate-pulse bg-gray-50`}
  }
  ${tw`flex flex-col gap-4 my-16 w-[40ch] sm:w-[70ch]`}
`;

export const Header = styled.div`
  ${tw`h-[15ch]`}
`;

export const MiscInfo = styled.div`
  ${tw`h-[10ch]`}
`;

export const Body = styled.div`
  ${tw`h-[50ch]`}
`;
