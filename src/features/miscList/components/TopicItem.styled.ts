import styled from 'styled-components';
import tw from 'twin.macro';

export const Wrapper = styled.li``;

export const TopicButton = styled.div<{
  isActive: boolean;
}>(({ isActive }) => [
  tw`text-sm text-gray-800 bg-gray-100 py-2 px-4 rounded-3xl`,
  isActive && tw`opacity-100`,
]);
