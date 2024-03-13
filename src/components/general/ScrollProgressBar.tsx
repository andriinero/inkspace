import { useScroll } from 'framer-motion';

import { Wrapper } from './ScrollProgressBar.styled';
import { FadeIn } from '@/styles/animations/FadeIn';

type ScrollProgressBarProps = { className?: string };

const ScrollProgressBar = ({ className }: ScrollProgressBarProps) => {
  const { scrollYProgress } = useScroll();

  return (
    <Wrapper
      className={className}
      initial={FadeIn.hidden}
      animate={FadeIn.visible}
      transition={FadeIn.transition}
      style={{ scaleX: scrollYProgress }}
    />
  );
};

export default ScrollProgressBar;
