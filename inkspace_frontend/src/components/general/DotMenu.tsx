import { ReactNode, useRef } from 'react';

import useCloseDropdown from '@/hooks/useCloseDropdown';

import Dropdown from './Dropdown';
import { BsThreeDots } from 'react-icons/bs';
import AppIcon from './AppIcon';

type DotMenuProps = {
  className?: string;
  isOpen: boolean;
  isAlignedLeft?: boolean;
  children: ReactNode;
  onToggle: () => void;
  onMenuClose: () => void;
};

const DotMenu = ({
  className,
  isOpen,
  isAlignedLeft,
  children,
  onToggle,
  onMenuClose,
}: DotMenuProps) => {
  const dropdown = useRef<HTMLUListElement>(null);

  useCloseDropdown(dropdown, onMenuClose);

  return (
    <>
      <AppIcon className={className} onClick={onToggle}>
        <BsThreeDots />
      </AppIcon>
      <Dropdown
        innerRef={dropdown}
        isOpen={isOpen}
        isAlignedLeft={isAlignedLeft}
      >
        {children}
      </Dropdown>
    </>
  );
};

export default DotMenu;
