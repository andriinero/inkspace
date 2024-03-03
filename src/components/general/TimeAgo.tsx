import { ReactNode } from 'react';
import { DateTime, Duration } from 'luxon';

import { Wrapper } from './TimeAgo.styled';

type PostDateProps = { className?: string; children?: ReactNode; date: string };

const TimeAgo = ({ className, children, date }: PostDateProps) => {
  const duration: Duration = DateTime.fromJSDate(new Date()).diff(DateTime.fromISO(date));

  const dayDiff: number = duration.as('days');
  const wholeDaysDiff: number = Math.floor(dayDiff);

  const relative: string = DateTime.fromISO(date).toRelative() as string;
  const absolute: string = DateTime.fromISO(date).toLocaleString(DateTime.DATE_MED);

  const dateResult = wholeDaysDiff > 10 ? absolute : relative;

  return (
    <Wrapper className={className}>
      {children}
      {dateResult}
    </Wrapper>
  );
};

export default TimeAgo;
