import { ReactNode, useRef } from 'react';
import { DotIcon } from './DotMenu.styled';
import Dropdown from './Dropdown';
import useCloseDropdown from '@/hooks/useCloseDropdown';

type DotMenuProps = {
  onToggle: () => void;
  onMenuClose: () => void;
  className?: string;
  isOpen: boolean;
  isAlignedLeft: boolean;
  children: ReactNode;
};

const DotMenu = ({
  onToggle,
  onMenuClose,
  className,
  isOpen,
  isAlignedLeft,
  children,
}: DotMenuProps) => {
  const dropdown = useRef<HTMLDivElement>(null);

  useCloseDropdown(dropdown, onMenuClose);

  return (
    <>
      <DotIcon
        className={className}
        onClick={onToggle}
        src="/dots-horizontal.svg"
        alt="Dot Menu Icon"
      />
      <Dropdown innerRef={dropdown} isOpen={isOpen} isAlignedLeft={isAlignedLeft}>
        {children}
      </Dropdown>
    </>
  );
};

export default DotMenu;
