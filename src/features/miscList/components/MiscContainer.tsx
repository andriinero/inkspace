import { Wrapper } from './MiscContainer.styled';
import AuthorContainer from './AuthorContainer';
import MiscTopics from './TopicContainer';

const MiscContainer = () => {
  return (
    <Wrapper>
      <AuthorContainer />
      <MiscTopics />
    </Wrapper>
  );
};

export default MiscContainer;
