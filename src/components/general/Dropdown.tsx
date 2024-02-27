import { ReactNode, RefObject } from 'react';
import { Wrapper, List } from './Dropdown.styled';

type DropdownProps = {
  isOpen: boolean;
  children: ReactNode;
  innerRef: RefObject<HTMLDivElement>;
};

const Dropdown = ({ isOpen, children, innerRef }: DropdownProps) => {
  return (
    <Wrapper ref={innerRef} $isOpen={isOpen}>
      <List>{children}</List>
    </Wrapper>
  );
};

export default Dropdown;
