import { ReactNode } from 'react';
import { DotIcon } from './DotMenu.styled';
import Dropdown from './Dropdown';

type DotMenuProps = {
  onToggle: () => void;
  className?: string;
  isOpen: boolean;
  children: ReactNode;
};

const DotMenu = ({ onToggle, className, isOpen, children }: DotMenuProps) => {
  return (
    <>
      <DotIcon
        className={className}
        onClick={onToggle}
        src="/dots-horizontal.svg"
        alt="Dot Menu Icon"
      />
      <Dropdown isOpen={isOpen}>{children}</Dropdown>
    </>
  );
};

export default DotMenu;
