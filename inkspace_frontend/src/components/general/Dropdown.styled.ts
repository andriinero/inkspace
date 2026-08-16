import styled from 'styled-components';
import tw from 'twin.macro';

export const Wrapper = styled.ul<{ $isOpen: boolean; $isAlignedLeft: boolean }>(
  ({ $isOpen, $isAlignedLeft }) => [
    `
      @starting-style {
        transform: translateY(-10px);
        opacity: 0.1;
      }
    `,
    tw`mt-6 hidden absolute origin-right min-w-[4rem] p-3 bg-white border border-gray-100 rounded-md shadow-md opacity-100 transition duration-150 overflow-hidden`,
    $isOpen && tw`block translate-y-0.5`,
    $isAlignedLeft && tw`ml-[-55px]`,
  ],
);

export const List = styled.div`
  ${tw`flex flex-col justify-center gap-4`}
`;
