import type { ReactNode } from 'react';
import type { HTMLMotionProps } from 'framer-motion';

import { Button } from './SubmitButton.styled';

type SubmitButtonProps = {
  className?: string;
  children?: ReactNode;
} & HTMLMotionProps<'button'>;

const SubmitButton = ({
  className,
  children,
  ...otherProps
}: SubmitButtonProps) => {
  return (
    <Button className={className} {...otherProps}>
      {children}
    </Button>
  );
};

export default SubmitButton;
