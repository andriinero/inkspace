import styled from 'styled-components';
import tw from 'twin.macro';

export const Wrapper = styled.div`
  grid-area: main;
  ${tw`grid grid-cols-[minmax(50ch,90ch)minmax(30ch,40ch)] justify-center gap-16 min-h-full`}
`;

export const MainWrapper = styled.div`
  ${tw`p-12`}
`;
