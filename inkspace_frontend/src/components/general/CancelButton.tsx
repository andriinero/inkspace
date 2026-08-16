import type { ReactNode } from 'react';
import type { HTMLMotionProps } from 'framer-motion';

import { Button } from './CancelButton.styled';

type CancelButtonProps = {
  className?: string;
  children?: ReactNode;
} & HTMLMotionProps<'button'>;

const CancelButton = ({
  className,
  children,
  ...otherProps
}: CancelButtonProps) => {
  return (
    <Button className={className} {...otherProps}>
      {children}
    </Button>
  );
};

export default CancelButton;
