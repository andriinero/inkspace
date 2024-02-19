import PostReadTime from '@/components/general/PostReadTime';
import {
  Divider,
  FollowButton,
  MainContainer,
  MiscContainer,
  Name,
  ProfileIcon,
  Wrapper,
} from './PostAuthor.styled';
import PostDate from '@/components/general/PostDate';

type PostAuthorProps = {
  _id: string;
  username: string;
  email: string;
  bodyLength: number;
  date: string;
};

//TODO: refactor semantics (not author specific)
const PostAuthor = ({ _id, username, email, bodyLength, date }: PostAuthorProps) => {
  return (
    <Wrapper>
      <ProfileIcon src="/portrait-placeholder.png" alt="Author Profile Picture" />
      <MainContainer>
        <Name>{username}</Name>
        <Divider>·</Divider>
        <FollowButton
          onClick={() => {
            console.log('followed!');
          }}
          type="button"
          value="Follow"
        />
      </MainContainer>
      <MiscContainer>
        <PostReadTime bodyLength={bodyLength} />
        <Divider>·</Divider>
        <PostDate date={date} />
      </MiscContainer>
    </Wrapper>
  );
};

export default PostAuthor;
