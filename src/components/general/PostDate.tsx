import { DateTime } from 'luxon';

import { Wrapper } from './PostDate.styled';

type PostDateProps = { date: string };

const PostDate = ({ date }: PostDateProps) => {
  return <Wrapper>{DateTime.fromISO(date).toLocaleString(DateTime.DATE_MED)}</Wrapper>;
};

export default PostDate;
