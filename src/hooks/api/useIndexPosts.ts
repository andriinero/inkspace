import { useEffect, useState } from 'react';

import Post from '@/types/Post';
import { PostContextType } from '@/pages/indexPage';

export const useIndexPosts = (): PostContextType => {
  const [posts, setPosts] = useState<Post[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<Error | null>(null);

  useEffect(() => {
    fetch('http://localhost:3000/api/posts', { mode: 'cors' })
      .then((res) => res.json())
      .then((data) => {
        setPosts(data);
      })
      .catch((err) => {
        setError(err);
      })
      .finally(() => {
        setLoading(false);
      });
  }, []);

  return { posts, loading, error };
};
