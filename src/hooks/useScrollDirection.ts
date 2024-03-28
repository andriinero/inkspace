import { useMotionValueEvent, useScroll } from 'framer-motion';
import { useState } from 'react';

const useScrollDirection = () => {
  const { scrollY } = useScroll();

  const [isScrollingDown, setIsScrollingDown] = useState<boolean>(false);

  useMotionValueEvent(scrollY, 'change', (latest) => {
    const prev = scrollY.getPrevious();
    const vector = latest - (prev as number);

    if (vector > 0) setIsScrollingDown(() => true);
    else setIsScrollingDown(() => false);
  });

  return { isScrollingDown };
};

export default useScrollDirection;
