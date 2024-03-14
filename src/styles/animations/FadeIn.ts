import { Transition, Variant } from 'framer-motion';

type FadeIn = {
  hidden: Variant;
  visible: Variant;
  transition: Transition;
};

export const FadeIn: FadeIn = {
  hidden: {
    opacity: 0,
  },
  visible: {
    opacity: 1,
  },
  transition: { duration: 0.25 },
};
