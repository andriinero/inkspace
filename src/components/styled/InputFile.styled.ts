import styled from 'styled-components';
import tw from 'twin.macro';

export const InputFile = styled.input`
  ${tw`text-xs border border-gray-200 rounded cursor-pointer`}
  ${tw`file:p-1 file:border-gray-50 file:border-none`}
`;
