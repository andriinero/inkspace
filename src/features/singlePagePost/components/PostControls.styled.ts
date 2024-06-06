import styled from 'styled-components';
import tw from 'twin.macro';

export const Wrapper = styled.div`
  ${tw`p-3 border-b border-t border-gray-100 flex justify-between items-center gap-4`}
`;

export const ControlsContainer = styled.div`
  ${tw`flex gap-4`}
`;

export const LikeWrapper = styled.div`
  ${tw`flex justify-center items-center gap-2`}
`;

export const LikeCount = styled.span`
  ${tw`font-light text-sm`}
`;
