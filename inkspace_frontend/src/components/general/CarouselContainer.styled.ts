import styled from 'styled-components';
import tw from 'twin.macro';
import AppIcon from './AppIcon';

export const Wrapper = styled.div`
  ${tw`grid items-center grid-cols-[auto,1fr,auto]`}
`;

export const ContentWrapper = styled.div`
  &::-webkit-scrollbar {
    display: none;
  }
  ${tw`flex items-center gap-12 px-0.5 overflow-x-hidden`}
`;

export const StyledAppIcon = styled(AppIcon)`
  ${tw`pb-2 absolute opacity-70 z-[15] from-70%`}
`;

export const LeftArrowIcon = styled(StyledAppIcon)`
  ${tw`bg-gradient-to-r from-white`}
`;

export const RightArrowIcon = styled(StyledAppIcon)`
  ${tw`justify-self-end bg-gradient-to-l from-white`}
`;
