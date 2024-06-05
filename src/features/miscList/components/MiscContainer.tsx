import AuthorContainer from './AuthorContainer';
import TopicContainer from './TopicContainer';
import BookmarkContainer from './BookmarkContainer';
import ExplorePostContainer from './ExplorePostContainer';
import { Wrapper } from './MiscContainer.styled';

const MiscContainer = () => {
  return (
    <Wrapper>
      <ExplorePostContainer />
      <AuthorContainer />
      <TopicContainer />
      <BookmarkContainer />
    </Wrapper>
  );
};

export default MiscContainer;
