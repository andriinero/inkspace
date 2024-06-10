import { useMotionValueEvent, useScroll } from 'framer-motion';
import { useState } from 'react';

const useWindowScrollDirection = () => {
  const { scrollY } = useScroll();

  const [isScrollingUp, setIsScrollingUp] = useState<boolean>(false);

  useMotionValueEvent(scrollY, 'change', (latest) => {
    const prev = scrollY.getPrevious();
    const vector = latest - (prev as number);

    if (vector < 0) setIsScrollingUp(() => true);
    else setIsScrollingUp(() => false);
  });

  return { isScrollingUp };
};

export default useWindowScrollDirection;
