import { useScroll } from 'framer-motion';

import { Wrapper } from './ScrollProgressBar.styled';

type ScrollProgressBarProps = { className?: string };

const ScrollProgressBar = ({ className }: ScrollProgressBarProps) => {
  const { scrollYProgress } = useScroll();

  return <Wrapper className={className} style={{ scaleX: scrollYProgress }} />;
};

export default ScrollProgressBar;
