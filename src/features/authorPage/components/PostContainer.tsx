import { useEffect } from 'react';
import { useAppDispatch, useAppSelector } from '@/app/hooks';

import {
  fetchAuthorPosts,
  selectAuthorPosts,
  selectFetchAuthorPostsState,
} from '../authorPageSlice';

import { Wrapper } from './PostContainer.styled';
import Spinner from '@/components/loaders/Spinner';
import Error from '@/components/general/Error';
import PostItem from '@/features/postList/components/PostItem';
import { selectProfileData } from '@/features/profile/profileSlice';

type PostContainerProps = {
  userId?: string;
};

const PostContainer = ({ userId }: PostContainerProps) => {
  const profileData = useAppSelector(selectProfileData);

  const postList = useAppSelector(selectAuthorPosts);
  const { isLoading, error } = useAppSelector(selectFetchAuthorPostsState);

  const dispatch = useAppDispatch();

  useEffect(() => {
    if (userId) dispatch(fetchAuthorPosts(userId));
  }, [userId, dispatch]);

  return (
    <Wrapper>
      {isLoading ? (
        <Spinner />
      ) : error ? (
        <Error />
      ) : (
        postList.map((p) => {
          const isBookmarked = profileData?.post_bookmarks.some(
            (b) => b === p._id
          ) as boolean;

          return <PostItem key={p._id} isBookmarked={isBookmarked} {...p} />;
        })
      )}
    </Wrapper>
  );
};

export default PostContainer;
