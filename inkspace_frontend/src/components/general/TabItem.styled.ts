import styled from 'styled-components';
import tw from 'twin.macro';

export const Wrapper = styled.div<{ $isSelected: boolean }>(
  ({ $isSelected }) => [
    tw`border-b border-gray-200 text-sm text-gray-500 hover:text-gray-800 transition`,
    $isSelected && tw`text-gray-800 border-gray-800`,
  ],
);
