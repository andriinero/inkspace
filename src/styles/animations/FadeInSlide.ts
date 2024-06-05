import { Transition } from "framer-motion";

type FadeInSlide = {
  hidden: NonNullable<unknown>;
  visible: NonNullable<unknown>;
  transition: Transition;
};

export const FadeInSlide: FadeInSlide = {
  hidden: {
    opacity: 0,
    y: -2,
  },
  visible: {
    opacity: 1,
    y: 0,
  },
  transition: { duration: 0.2 },
};
