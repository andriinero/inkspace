import {
  Divider,
  FollowButton,
  MainContainer,
  MiscContainer,
  Name,
  ProfileIcon,
  ReadTimeEstimate,
  TimeAgo,
  Wrapper,
} from './PostAuthor.styled';

type PostAuthorProps = {
  _id: string;
  username: string;
  email: string;
};

const PostAuthor = ({ _id, username, email }: PostAuthorProps) => {
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
          value='Follow'
        />
      </MainContainer>
      <MiscContainer>
        <ReadTimeEstimate>1 min</ReadTimeEstimate>
        <Divider>·</Divider>
        <TimeAgo>5 mins</TimeAgo>
      </MiscContainer>
    </Wrapper>
  );
};

export default PostAuthor;
