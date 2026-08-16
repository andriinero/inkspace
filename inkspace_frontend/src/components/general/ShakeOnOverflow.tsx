import { ReactNode, useEffect } from 'react';

import { Wrapper } from './ShakeOnOverflow.styled';

type ShakeOnOverflowProps = {
  className?: string;
  children?: ReactNode;
  isOverflown: boolean;
  setIsOverflown: (value: boolean) => void;
};

const SHAKE_DURATION = 100;
const ITERATION_COUNT = 2;

const ShakeOnOverflow = ({
  className,
  children,
  isOverflown,
  setIsOverflown,
}: ShakeOnOverflowProps) => {
  useEffect(() => {
    if (isOverflown)
      setTimeout(() => {
        setIsOverflown(false);
      }, SHAKE_DURATION * ITERATION_COUNT);
  }, [isOverflown, setIsOverflown]);

  return (
    <Wrapper
      className={className}
      $isOverflown={isOverflown}
      $shakeDuration={SHAKE_DURATION}
      $iterationCount={ITERATION_COUNT}
    >
      {children}
    </Wrapper>
  );
};

export default ShakeOnOverflow;
