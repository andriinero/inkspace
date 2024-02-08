import { useState } from 'react';

import Post from '@/types/Post';
import postsData from '@/data/postsData';

import { Wrapper } from './index.styled';
import Header from './header/Header';
import Main from './main/Main';
import Aside from './aside/Aside';
import Footer from './footer/Footer';

const IndexLayout = () => {
  const [posts, setPosts] = useState<Post[]>(postsData);

  return (
    <Wrapper>
      <Header />
      <Main posts={postsData} />
      <Aside />
      <Footer />
    </Wrapper>
  );
};

export default IndexLayout;
