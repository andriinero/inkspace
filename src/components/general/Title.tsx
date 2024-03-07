import { ReactNode } from 'react';

import { StyledTitle } from './Title.styled';

type TitleProps = { className?: string; children?: ReactNode };

const Title = ({ className, children }: TitleProps) => {
  return <StyledTitle className={className}>{children}</StyledTitle>;
};

export default Title;
