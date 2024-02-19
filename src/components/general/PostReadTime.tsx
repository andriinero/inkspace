import { CHARACTERS_PER_MINUTE } from '@/data/consts';
import { Wrapper } from './PostReadTime.styled';

type PostReadTimeProps = {
  bodyLength: number;
};

const PostReadTime = ({ bodyLength }: PostReadTimeProps) => {
  const timeToRead: number = Math.trunc(Math.round(bodyLength / CHARACTERS_PER_MINUTE));
  const timeEstimate: string = timeToRead < 1 ? '<1' : timeToRead.toString();

  return <Wrapper>{timeEstimate} min read</Wrapper>;
};

export default PostReadTime;