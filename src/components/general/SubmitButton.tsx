import type { ReactNode } from 'react';
import type { HTMLMotionProps } from 'framer-motion';

import { Button } from './SubmitButton.styled';

type SubmitButtonProps = {
  className?: string;
  children?: ReactNode;
} & HTMLMotionProps<'button'>;

const SubmitButton = ({ className, children }: SubmitButtonProps) => {
  return <Button className={className}>{children}</Button>;
};

export default SubmitButton;
