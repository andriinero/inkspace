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
    tw`mt-6 ml-[25px] hidden absolute p-3 bg-white border rounded-md shadow-sm opacity-100 transition duration-150`,
    $isOpen && tw`block translate-y-0.5`,
    $isAlignedLeft && tw`ml-[-75px] sm:ml-[-75px]`,
  ],
);

export const List = styled.div`
  ${tw`flex flex-col justify-center gap-4`}
`;
