import { Body, Header, MiscInfo, Post, Wrapper } from './PostListLoader.styled';

const PostListLoader = () => {
  return (
    <Wrapper>
      <Post>
        <MiscInfo />
        <Header />
        <Body />
      </Post>
      <Post>
        <MiscInfo />
        <Header />
        <Body />
      </Post>
      <Post>
        <MiscInfo />
        <Header />
        <Body />
      </Post>
      <Post>
        <MiscInfo />
        <Header />
        <Body />
      </Post>
      <Post>
        <MiscInfo />
        <Header />
        <Body />
      </Post>
    </Wrapper>
  );
};

export default PostListLoader;
