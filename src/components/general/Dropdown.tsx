import { ReactNode, RefObject } from 'react';

import { Wrapper, List } from './Dropdown.styled';

type DropdownProps = {
  innerRef: RefObject<HTMLUListElement>;
  children: ReactNode;
  isOpen: boolean;
  isAlignedLeft: boolean;
};

const Dropdown = ({ innerRef, children, isOpen, isAlignedLeft }: DropdownProps) => {
  return (
    <Wrapper ref={innerRef} $isOpen={isOpen} $isAlignedLeft={isAlignedLeft}>
      <List>{children}</List>
    </Wrapper>
  );
};

export default Dropdown;
