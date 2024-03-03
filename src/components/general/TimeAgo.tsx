import { ReactNode } from 'react';
import { DateTime } from 'luxon';

import { Wrapper } from './TimeAgo.styled';

type PostDateProps = { className?: string; children?: ReactNode; date: string };

const TimeAgo = ({ className, children, date }: PostDateProps) => {
  return (
    <Wrapper className={className}>
      {children}
      {DateTime.fromISO(date).toLocaleString(DateTime.DATE_MED)}
    </Wrapper>
  );
};

export default TimeAgo;
