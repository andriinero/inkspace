import { createContext } from 'react';
import { useIndexPosts } from '@/hooks/api/useIndexPosts';

import Post from '@/types/Post';

import { Wrapper } from './index.styled';
import Header from './header/Header';
import Main from './main/Main';
import Footer from './footer/Footer';

export type PostContextType = {
  posts: Post[];
  loading: boolean;
  error: Error | null;
};

export const PostContext = createContext<PostContextType>(null!);

const IndexLayout = () => {
  const postState = useIndexPosts();

  return (
    <Wrapper>
      <Header />
      <PostContext.Provider value={postState}>
        <Main />
      </PostContext.Provider>
      <Footer />
    </Wrapper>
  );
};

export default IndexLayout;
