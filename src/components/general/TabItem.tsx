import { ReactNode } from 'react';
import { Wrapper } from './TabItem.styled';

type TabItemProps = {
  isSelected?: boolean;
  children: ReactNode;
  onItemClick?: () => void;
  className?: string;
};

const TabItem = ({
  isSelected = false,
  children,
  onItemClick: onClick,
  className,
}: TabItemProps) => {
  return (
    <Wrapper className={className} $isSelected={isSelected} onClick={onClick}>
      {children}
    </Wrapper>
  );
};

export default TabItem;
