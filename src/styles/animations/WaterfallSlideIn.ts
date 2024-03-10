import { Variants } from 'framer-motion';

type Waterfall = {
  container: Variants;
  item: Variants;
};

export const WaterfallSlideIn: Waterfall = {
  container: {
    visible: {
      opacity: 1,
      scale: 1,
      transition: {
        delayChildren: 0.05,
        staggerChildren: 0.07,
      },
    },
  },
  item: {
    hidden: { x: -10, opacity: 0 },
    visible: {
      x: 0,
      opacity: 1,
    },
  },
};