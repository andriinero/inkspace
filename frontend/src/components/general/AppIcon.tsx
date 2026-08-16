import cn from '@/utils/cn';

import type { ComponentPropsWithoutRef, ReactNode } from 'react';

type AppIconProps = {
  className?: string;
  children?: ReactNode;
} & ComponentPropsWithoutRef<'div'>;

const AppIcon = ({ className, children, ...otherProps }: AppIconProps) => {
  return (
    <div
      className={cn(
        'cursor-pointer text-gray-600 transition hover:text-gray-800',
        className,
      )}
      {...otherProps}
    >
      {children}
    </div>
  );
};

export default AppIcon;
