import { Transition } from "framer-motion";

type PopOut = {
  hidden: NonNullable<unknown>;
  visible: NonNullable<unknown>;
  transition: Transition;
};

export const PopOut: PopOut = {
  hidden: { scale: 0 },
  visible: { scale: 1 },
  transition: { duration: 0.1 },
};
