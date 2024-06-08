import styled from 'styled-components';
import tw from 'twin.macro';

export const Wrapper = styled.div`
  ${tw`flex flex-col gap-12 p-8`}
`;

export const Post = styled.div`
  & > * {
    ${tw`bg-gray-50 animate-pulse`}
  }
  ${tw`flex flex-col gap-4`}
`;

export const Header = styled.div`
  ${tw`min-h-[3ch] min-w-[45ch]`}
`;

export const MiscInfo = styled.div`
  ${tw`min-h-[3ch] min-w-[30ch]`}
`;

export const Body = styled.div`
  ${tw`min-h-[12ch]`}
`;
