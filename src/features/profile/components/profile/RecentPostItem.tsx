import { useAppSelector } from "@/app/hooks";

import {
  selectFetchProfilePostsState,
  selectProfilePostsList,
} from "../../profileSlice";

import { Waterfall } from "@/styles/animations/Waterfall";

import PostListLoader from "@/components/loaders/PostListLoader";
import Error from "@/components/general/Error";
import { CalloutText, PostsList, Wrapper } from "./RecentPostContainer.styled";
import GeneralPostItem from "@/components/general/GeneralPostItem";

const RecentPosts = () => {
  const postsList = useAppSelector(selectProfilePostsList);
  const { isLoading, error } = useAppSelector(selectFetchProfilePostsState);

  return (
    <Wrapper>
      {isLoading ? (
        <PostListLoader />
      ) : error ? (
        <Error />
      ) : postsList.length === 0 ? (
        <CalloutText>No posts yet!</CalloutText>
      ) : (
        <PostsList
          variants={Waterfall.container}
          initial="hidden"
          animate="visible"
        >
          {postsList.map((b) => (
            <GeneralPostItem key={b._id} {...b} />
          ))}
        </PostsList>
      )}
    </Wrapper>
  );
};

export default RecentPosts;
