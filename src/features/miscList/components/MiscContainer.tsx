import AuthorContainer from './AuthorContainer';
import TopicContainer from './TopicContainer';
import { Wrapper } from './MiscContainer.styled';
import BookmarkContainer from './BookmarkContainer';

const MiscContainer = () => {
  return (
    <Wrapper>
      <AuthorContainer />
      <TopicContainer />
      <BookmarkContainer />
    </Wrapper>
  );
};

export default MiscContainer;
