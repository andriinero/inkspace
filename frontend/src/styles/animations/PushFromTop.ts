type PushFromTop = {
  hidden: NonNullable<unknown>;
  visible: NonNullable<unknown>;
  transition: NonNullable<unknown>;
};

export const PushFromTop: PushFromTop = {
  hidden: {
    opacity: 0.5,
    originY: 0,
    y: -50,
  },
  visible: {
    opacity: 1,
    y: 0,
  },
  transition: { duration: 0.15 },
};
