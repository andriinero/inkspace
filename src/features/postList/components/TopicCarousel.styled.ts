import styled from "styled-components";
import CarouselContainer from "@/components/general/CarouselContainer";
import TabItem from "@/components/general/TabItem";

export const Wrapper = styled.div``;

export const StyledCarouselContainer = styled(CarouselContainer)`
  gap: 1rem;
`;

export const StyledTabItem = styled(TabItem)`
  flex-shrink: 0;

  padding-bottom: 0.6rem;

  font-size: 0.9rem;
`;
