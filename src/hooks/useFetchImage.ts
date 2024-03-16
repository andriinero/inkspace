/* eslint-disable react-hooks/rules-of-hooks */
import { useAppFetch } from '@/lib/useAppFetch';
import { useEffect, useState } from 'react';

const useFetchImage = (imageId: string) => {
  const [imageURL, setImage] = useState<string>();
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [error, setError] = useState<number | null>();

  useEffect(() => {
    const fetch = () => {
      useAppFetch(`/api/images/${imageId}`, {})
        .then(({ data, responseState }) => {
          if (!responseState.ok) {
            return setError(responseState.statusCode);
          }

          return data;
        })
        .then((data) => {
          setImage(data.imgURL);
        })
        .finally(() => {
          setIsLoading(false);
        });
    };

    if (imageId) fetch();
  }, [imageId]);

  return { imageURL, isLoading, error };
};

export default useFetchImage;
