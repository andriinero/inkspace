import styled from 'styled-components';
import tw from 'twin.macro';

export const Wrapper = styled.div`
  grid-template-areas: 'header' 'main' 'footer';
  ${tw`grid grid-rows-[auto,1fr,auto] min-h-dvh`}
`;

export const WrapperMain = styled.main`
  ${tw`flex justify-center`}
`;
