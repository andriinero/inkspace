import { ReactNode } from 'react';
import { Counter } from './CommentCounter.styled';

type CommentCounterProps = {
  className?: string;
  children?: ReactNode;
  isOverflown: boolean;
};

const CommentCounter = ({ className, children, isOverflown }: CommentCounterProps) => {
  return (
    <Counter className={className} $isOverflown={isOverflown}>
      {children}
    </Counter>
  );
};

export default CommentCounter;
