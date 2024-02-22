import { ReactNode } from 'react';
import { Wrapper, List } from './Dropdown.styled';

type DropdownProps = {
  isOpen: boolean;
  children: ReactNode;
};

const Dropdown = ({ isOpen, children }: DropdownProps) => {
  return (
    <Wrapper $isOpen={isOpen}>
      <List>{children}</List>
    </Wrapper>
  );
};

export default Dropdown;
