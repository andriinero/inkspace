import { ReactNode, useEffect, useRef, useState } from 'react';

import * as S from './CarouselContainer.styled';

type CarouselContainerProps = {
  stepSize?: number;
  children?: ReactNode;
};

const CarouselContainer = ({ stepSize = 100, children }: CarouselContainerProps) => {
  const [scrollProgress, setScrollProgress] = useState(0);
  const carouselContentRef = useRef<HTMLDivElement>(null);

  const maxWidth =
    (carouselContentRef.current?.scrollWidth as number) -
    (carouselContentRef.current?.offsetWidth as number);

  const handleLeftButtonClick = (): void => {
    if (scrollProgress - stepSize < 0) {
      setScrollProgress(0);
    } else {
      setScrollProgress(scrollProgress - stepSize);
    }
  };

  const handleRightButtonClick = (): void => {
    if (scrollProgress + stepSize > maxWidth) {
      setScrollProgress(maxWidth);
    } else {
      setScrollProgress(scrollProgress + stepSize);
    }
  };

  useEffect(() => {
    carouselContentRef.current?.scroll({
      left: scrollProgress,
      behavior: 'smooth',
    });
  }, [scrollProgress]);

  return (
    <S.Wrapper>
      <S.LeftButton
        onClick={handleLeftButtonClick}
        src="/arrow-left.svg"
        alt="Carousel Left Button Icon"
      />
      <S.ContentWrapper ref={carouselContentRef}>{children}</S.ContentWrapper>
      <S.RightButton
        onClick={handleRightButtonClick}
        src="/arrow-right.svg"
        alt="Carousel Right Button Icon"
      />
    </S.Wrapper>
  );
};

export default CarouselContainer;
