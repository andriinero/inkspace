import { useAppSelector } from '@/app/hooks';

import { selectIsAuthenticated } from '@/features/auth/authSlice';

import AuthorContainer from './AuthorContainer';
import TopicContainer from './TopicContainer';
import BookmarkContainer from './BookmarkContainer';
import ExplorePostContainer from './ExplorePostContainer';
import { Wrapper } from './MiscContainer.styled';

const MiscContainer = () => {
  const isAuthenticated = useAppSelector(selectIsAuthenticated);

  return (
    <Wrapper>
      <ExplorePostContainer />
      <AuthorContainer />
      <TopicContainer />
      {isAuthenticated && <BookmarkContainer />}
    </Wrapper>
  );
};

export default MiscContainer;
