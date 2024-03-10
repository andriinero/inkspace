import { useEffect } from 'react';
import { useAppDispatch, useAppSelector } from '@/app/hooks';

import { selectProfileData } from '@/features/profile/profileSlice';
import {
  fetchAuthorPosts,
  selectAuthorPosts,
  selectFetchAuthorPostsState,
} from '../authorPageSlice';

import { PostList, Wrapper } from './PostContainer.styled';
import Error from '@/components/general/Error';
import PostItem from '@/features/postList/components/PostItem';
import PostListLoader from '@/components/loaders/PostListLoader';
import { Waterfall } from '@/lib/appAnimate';

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
        <PostListLoader />
      ) : error ? (
        <Error />
      ) : (
        <PostList variants={Waterfall.container} initial="hidden" animate="visible">
          {postList.map((p) => {
            const isBookmarked = profileData?.post_bookmarks.some(
              (b) => b === p._id
            ) as boolean;

            return <PostItem key={p._id} isBookmarked={isBookmarked} {...p} />;
          })}
        </PostList>
      )}
    </Wrapper>
  );
};

export default PostContainer;
