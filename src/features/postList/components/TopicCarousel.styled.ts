import styled from 'styled-components';
import CarouselContainer from '@/components/general/CarouselContainer';
import TabItem from '@/components/general/TabItem';
import tw from 'twin.macro';

export const Wrapper = styled.div``;

export const StyledCarouselContainer = styled(CarouselContainer)`
  ${tw``}
`;

export const ContentPadding = styled.div`
  ${tw`border-b border-gray-200 relative top-[-1px]`}
`;

export const StyledTabItem = styled(TabItem)`
  flex-shrink: 0;

  padding-bottom: 0.6rem;

  font-size: 0.9rem;
  ${tw`z-10`}
`;
