import styled from 'styled-components';
import tw from 'twin.macro';

export const Wrapper = styled.div`
  ${tw`flex flex-col gap-4`}
`;

export const Item = styled.div`
  ${tw`bg-gray-50 animate-pulse min-h-[12ch]`}
`;
