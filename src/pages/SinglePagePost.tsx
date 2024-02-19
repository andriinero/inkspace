import { useAppDispatch, useAppSelector } from '@/app/hooks';
import Error from '@/components/general/Error';
import Spinner from '@/components/general/Spinner';
import {
  fetchPost,
  selectSinglePostState,
} from '@/features/singlePagePost/singlePagePostSlice';
import { useEffect } from 'react';
import { useParams } from 'react-router-dom';

const SinglePagePost = () => {
  const dispatch = useAppDispatch();

  const { postid } = useParams();

  useEffect(() => {
    dispatch(fetchPost(postid));
  }, [dispatch, postid]);

  const { post, isLoading, error } = useAppSelector(selectSinglePostState);

  if (isLoading) return <Spinner />;
  if (error) return <Error />;

  return (
    <div>
      <p>
        Post with title<strong> {post?.title}</strong>
      </p>
    </div>
  );
};

export default SinglePagePost;
