import { useAppSelector } from '@/app/hooks';
import { selectIsAuthenticated } from '@/features/auth/authSlice';

import { Wrapper } from './MiscContainer.styled';
import AuthorContainer from './AuthorContainer';
import TopicContainer from './TopicContainer';
import BookmarkContainer from './BookmarkContainer';

const MiscContainer = () => {
  const isAuthenticated = useAppSelector(selectIsAuthenticated);

  return (
    <Wrapper>
      <AuthorContainer />
      <TopicContainer />
      {isAuthenticated && <BookmarkContainer />}
    </Wrapper>
  );
};

export default MiscContainer;
