import { ReactNode } from 'react';
import { Wrapper } from './TabItem.styled';

type TabItemProps = { isSelected?: boolean; children: ReactNode; onItemClick?: () => void };

const TabItem = ({ isSelected = false, children, onItemClick: onClick }: TabItemProps) => {
  return (
    <Wrapper $isSelected={isSelected} onClick={onClick}>
      {children}
    </Wrapper>
  );
};

export default TabItem;
