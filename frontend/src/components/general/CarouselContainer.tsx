import { useEffect, useRef, useState } from 'react';

import type { ReactNode } from 'react';

import { BsChevronLeft, BsChevronRight } from 'react-icons/bs';
import * as S from './CarouselContainer.styled';

type CarouselContainerProps = {
  stepSize?: number;
  className?: string;
  children?: ReactNode;
};

const CarouselContainer = ({
  stepSize = 100,
  className,
  children,
}: CarouselContainerProps) => {
  const [scrollProgress, setScrollProgress] = useState<number>(0);
  const carouselContentRef = useRef<HTMLDivElement>(null);

  const maxScrollWidth =
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
    if (scrollProgress + stepSize > maxScrollWidth) {
      setScrollProgress(maxScrollWidth);
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
    <S.Wrapper className={className}>
      <S.LeftArrowIcon>
        <BsChevronLeft onClick={handleLeftButtonClick} />
      </S.LeftArrowIcon>
      <S.ContentWrapper ref={carouselContentRef}>{children}</S.ContentWrapper>
      <S.RightArrowIcon>
        <BsChevronRight onClick={handleRightButtonClick} />
      </S.RightArrowIcon>
    </S.Wrapper>
  );
};

export default CarouselContainer;
