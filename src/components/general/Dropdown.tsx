import { ReactNode, RefObject } from "react";

import { Wrapper, List } from "./Dropdown.styled";

type DropdownProps = {
  innerRef?: RefObject<HTMLUListElement>;
  isOpen: boolean;
  isAlignedLeft?: boolean;
  className?: string;
  children?: ReactNode;
};

const Dropdown = ({
  innerRef,
  isOpen,
  isAlignedLeft = false,
  className,
  children,
}: DropdownProps) => {
  return (
    <Wrapper
      className={className}
      ref={innerRef}
      $isOpen={isOpen}
      $isAlignedLeft={isAlignedLeft}
    >
      <List>{children}</List>
    </Wrapper>
  );
};

export default Dropdown;
