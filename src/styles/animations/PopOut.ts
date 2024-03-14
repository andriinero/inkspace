import { Transition, Variant } from 'framer-motion';

type PopOut = {
  hidden: Variant;
  visible: Variant;
  transition: Transition;
};

export const PopOut: PopOut = {
  hidden: { scale: 0 },
  visible: { scale: 1 },
  transition: {
    type: 'spring',
    stiffness: 260,
    damping: 20,
  },
};
