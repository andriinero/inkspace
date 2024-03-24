import { ReactNode } from 'react';

import { AppDate } from '@/lib/AppDate';

import { Wrapper } from './TimeAgo.styled';

type PostDateProps = { className?: string; children?: ReactNode; date: string };

const TimeAgo = ({ className, children, date }: PostDateProps) => {
  const diffAsDays: number = AppDate.getFromNowDiffAs(date, 'days');
  const diffAsMinutes: number = AppDate.getFromNowDiffAs(date, 'minutes');

  const wholeDaysDiff: number = Math.floor(diffAsDays);
  const wholeMinutesDiff: number = Math.floor(diffAsMinutes);

  const relative: string = AppDate.getRelative(date);
  const absolute: string = AppDate.getAbsolute(date);

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
