import { CHARACTERS_PER_MINUTE } from '@/data/consts';

import { Wrapper } from './PostReadTime.styled';

type PostReadTimeProps = {
  className?: string;
  bodyLength: number;
};

const PostReadTime = ({ className, bodyLength }: PostReadTimeProps) => {
  const timeToRead: number = Math.trunc(Math.round(bodyLength / CHARACTERS_PER_MINUTE));
  const timeEstimate: string = timeToRead < 1 ? 'less than 1' : timeToRead.toString();

  return <Wrapper className={className}>{timeEstimate} min read</Wrapper>;
};

export default PostReadTime;
