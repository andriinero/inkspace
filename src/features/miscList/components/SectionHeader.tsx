import type { ReactNode } from 'react';

import { Header } from './SectionHeader.styled';

type SectionHeaderProps = { className?: string; children?: ReactNode };

const SectionHeader = ({ className, children }: SectionHeaderProps) => {
  return <Header className={className}>{children}</Header>;
};

export default SectionHeader;
