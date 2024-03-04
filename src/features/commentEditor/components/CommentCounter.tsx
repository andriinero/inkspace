import { ReactNode } from 'react';
import { Counter } from './CommentCounter.styled';

type CommentCounterProps = {
  className?: string;
  children?: ReactNode;
};

// TODO: overflow animation shake
const CommentCounter = ({ className, children }: CommentCounterProps) => {
  return <Counter className={className}>{children}</Counter>;
};

export default CommentCounter;
