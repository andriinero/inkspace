import AuthorContainer from './AuthorContainer';
import MiscTopics from './TopicContainer';
import { Wrapper } from './MiscContainer.styled';

const MiscContainer = () => {
  return (
    <Wrapper>
      <AuthorContainer />
      <MiscTopics />
    </Wrapper>
  );
};

export default MiscContainer;
