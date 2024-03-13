export const Waterfall = {
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
    hidden: { y: -2, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
    },
  },
};
