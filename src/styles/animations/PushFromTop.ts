type PushFromTop = {
  hidden: NonNullable<unknown>;
  visible: NonNullable<unknown>;
  transition: NonNullable<unknown>;
};

export const PushFromTop: PushFromTop = {
  hidden: {
    opacity: 0.5,
    originY: 0,
    scaleY: 0,
  },
  visible: {
    opacity: 1,
    scaleY: 1,
  },
  transition: { duration: 0.15 },
};
