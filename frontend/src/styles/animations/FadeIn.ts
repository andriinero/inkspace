type FadeIn = {
  hidden: NonNullable<unknown>;
  visible: NonNullable<unknown>;
  transition: NonNullable<unknown>;
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
