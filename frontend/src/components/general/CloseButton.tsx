import type { ComponentPropsWithoutRef } from 'react';

import AppIcon from './AppIcon';
import { BsX } from 'react-icons/bs';
import { Button } from './CloseButton.styled';

type CloseButtonProps = {
  className?: string;
} & ComponentPropsWithoutRef<'button'>;

const CloseButton = ({ className, ...otherProps }: CloseButtonProps) => {
  return (
    <Button className={className} {...otherProps}>
      <AppIcon>
        <BsX size="1.25rem" />
      </AppIcon>
    </Button>
  );
};

export default CloseButton;
