import { Wrapper, List, ListItem } from './Dropdown.styled';

type DropdownProps = {
  isOpen: boolean;
};

const Dropdown = ({ isOpen }: DropdownProps) => {
  return (
    <Wrapper $isOpen={isOpen}>
      <List>
        <ListItem>Mute this author</ListItem>
        <ListItem>Mute this publication</ListItem>
      </List>
    </Wrapper>
  );
};

export default Dropdown;
