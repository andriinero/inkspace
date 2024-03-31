import { Icon } from '@/components/icons/AppIcon.styled';
import styled from 'styled-components';

export const Wrapper = styled.div`
  display: grid;
  grid-template-columns: auto 1fr auto;
`;

export const ContentWrapper = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 0.2rem;

  overflow-x: scroll;

  &::-webkit-scrollbar {
    display: none;
  }
`;

export const CarouselIcon = styled(Icon)``;

export const LeftButton = styled(CarouselIcon)``;

export const RightButton = styled(CarouselIcon)``;
