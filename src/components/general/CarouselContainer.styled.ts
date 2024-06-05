import { Icon } from '@/components/styled/AppIcon.styled';
import styled from 'styled-components';

export const Wrapper = styled.div`
  display: grid;
  align-items: center;
  grid-template-columns: auto 1fr auto;
`;

export const ContentWrapper = styled.div`
  display: flex;
  align-items: center;
  gap: 3rem;

  padding: 0 0.2rem;
  overflow-x: scroll;

  &::-webkit-scrollbar {
    display: none;
  }
`;

export const CarouselIcon = styled(Icon)``;

export const LeftButton = styled(CarouselIcon)``;

export const RightButton = styled(CarouselIcon)``;
