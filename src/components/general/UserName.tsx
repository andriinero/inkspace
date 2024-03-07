import { ReactNode } from 'react';

import { Name } from './UserName.styled';

type UserNameProps = { className?: string; children?: ReactNode };

const UserName = ({ className, children }: UserNameProps) => {
  return <Name className={className}>{children}</Name>;
};

export default UserName;
