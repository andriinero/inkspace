import styled from 'styled-components';
import tw from 'twin.macro';

export const Wrapper = styled.div<{ $isOpen: boolean }>(({ $isOpen }) => [
  tw`hidden flex-col bg-white border-l border-gray-200 fixed top-0 right-0 z-30 max-w-sm w-full h-dvh p-4 shadow-md gap-4 overflow-y-scroll`,
  $isOpen && tw`flex`,
]);

export const Header = styled.h2`
  ${tw`text-xl font-medium`}
`;

export const WrapperList = styled.ol`
  ${tw`flex flex-col`}
`;

export const WrapperControls = styled.div`
  ${tw`flex justify-between items-center px-1`}
`;
