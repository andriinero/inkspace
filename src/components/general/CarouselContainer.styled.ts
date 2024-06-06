import { Icon } from '@/components/styled/AppIcon.styled';
import styled from 'styled-components';
import tw from 'twin.macro';

export const Wrapper = styled.div`
  display: grid;
  align-items: center;
  grid-template-columns: auto 1fr auto;
`;

export const ContentWrapper = styled.div`
  &::-webkit-scrollbar {
    display: none;
  }
  // ${tw`flex items-center gap-12 px-0.5 overflow-x-hidden border-b border-gray-300`}
  ${tw`flex items-center gap-12 px-0.5 overflow-x-hidden`}
`;

export const CarouselIcon = styled(Icon)``;

export const LeftButton = styled(CarouselIcon)``;

export const RightButton = styled(CarouselIcon)``;
