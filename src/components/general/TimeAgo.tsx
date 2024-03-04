import { ReactNode } from 'react';
import { DateTime, Duration } from 'luxon';

import { Wrapper } from './TimeAgo.styled';

type PostDateProps = { className?: string; children?: ReactNode; date: string };

const TimeAgo = ({ className, children, date }: PostDateProps) => {
  const duration: Duration = DateTime.fromJSDate(new Date()).diff(DateTime.fromISO(date));

  const diffAsDays = duration.as('days');
  const diffAsMinutes = duration.as('minutes');

  const wholeDaysDiff: number = Math.floor(diffAsDays);
  const wholeMinutesDiff: number = Math.floor(diffAsMinutes);

  const relative: string = DateTime.fromISO(date).toRelative() || '';
  const absolute: string = DateTime.fromISO(date).toLocaleString(DateTime.DATE_MED);

  const dateResult =
    wholeMinutesDiff < 1 ? 'now' : wholeDaysDiff > 10 ? absolute : relative;

  return (
    <Wrapper className={className}>
      {children}
      {dateResult}
    </Wrapper>
  );
};

export default TimeAgo;
