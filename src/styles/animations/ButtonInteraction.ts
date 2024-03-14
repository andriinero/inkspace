import { Variant } from 'framer-motion';

type ButtonInteraction = {
  whileTap: { animation: Variant };
};

export const ButtonInteraction: ButtonInteraction = {
  whileTap: {
    animation: { scale: 0.9 },
  },
};
