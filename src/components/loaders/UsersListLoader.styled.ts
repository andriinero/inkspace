import styled from 'styled-components';
import tw from 'twin.macro';

export const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  gap: 1rem;
`;

export const Item = styled.div`
  min-height: 12ch;
  ${tw`bg-gray-50 animate-pulse`}
`;
