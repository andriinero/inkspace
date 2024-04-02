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

export const LeftButton = styled(CarouselIcon)`
  background-color: linear-gradient(top, rgba(255, 0, 0, 0), rgba(255, 0, 0, 1));
`;

export const RightButton = styled(CarouselIcon)`
  background-color: linear-gradient(top, rgba(255, 0, 0, 0), rgba(255, 0, 0, 1));
`;
