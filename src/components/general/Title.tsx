import { ReactNode } from 'react';

import { StyledTitle } from './Title.styled';

type TitleProps = { className?: string; children?: ReactNode };

// TODO: use span
const Title = ({ className, children }: TitleProps) => {
  return <StyledTitle className={className}>{children}</StyledTitle>;
};

export default Title;
