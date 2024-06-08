import styled from 'styled-components';
import tw from 'twin.macro';

export const Wrapper = styled.div`
  & > * {
    ${tw`animate-pulse bg-gray-50`}
  }
  ${tw`flex flex-col gap-4 my-16 min-w-[70ch]`}
`;

export const Header = styled.div`
  ${tw`min-h-[15ch]`}
`;

export const MiscInfo = styled.div`
  ${tw`min-h-[10ch]`}
`;

export const Body = styled.div`
  ${tw`min-h-[80ch]`}
`;
