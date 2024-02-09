import { WrapperMain } from './Main.styled';
import PostContainer from './posts/PostContainer';
import MiscContainer from './misc/MiscContainer';

const Main = () => {
  return (
    <WrapperMain>
      <PostContainer />
      <MiscContainer />
    </WrapperMain>
  );
};

export default Main;
