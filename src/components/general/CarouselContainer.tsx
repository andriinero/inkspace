import { useEffect, useRef, useState } from 'react';

import type { ReactNode } from 'react';

import { BsChevronLeft, BsChevronRight } from 'react-icons/bs';
import * as S from './CarouselContainer.styled';
import AppIcon from './AppIcon';

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
      <AppIcon>
        <BsChevronLeft onClick={handleLeftButtonClick} />
      </AppIcon>
      <S.ContentWrapper ref={carouselContentRef}>{children}</S.ContentWrapper>
      <AppIcon>
        <BsChevronRight onClick={handleRightButtonClick} />
      </AppIcon>
    </S.Wrapper>
  );
};

export default CarouselContainer;
