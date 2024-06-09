import styled from 'styled-components';
import tw from 'twin.macro';

export const Wrapper = styled.div`
  grid-area: main;
  ${tw`flex justify-center max-w-screen-xl w-full`}
`;

export const MainWrapper = styled.div`
  ${tw`py-12 px-8 sm:px-20 max-w-4xl w-full`}
`;
