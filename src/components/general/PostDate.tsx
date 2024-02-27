import { DateTime } from 'luxon';

import { Wrapper } from './PostDate.styled';

type PostDateProps = { className?: string; date: string };

const PostDate = ({ className, date }: PostDateProps) => {
  return (
    <Wrapper className={className}>
      {DateTime.fromISO(date).toLocaleString(DateTime.DATE_MED)}
    </Wrapper>
  );
};

export default PostDate;
