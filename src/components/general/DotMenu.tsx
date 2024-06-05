import { ReactNode, useRef } from "react";

import useCloseDropdown from "@/hooks/useCloseDropdown";

import Dropdown from "./Dropdown";
import { StyledIcon } from "./DotMenu.styled";

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
      <StyledIcon
        className={className}
        onClick={onToggle}
        src="/dots-horizontal.svg"
        alt="Dot Menu Icon"
      />
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
