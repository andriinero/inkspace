import { useAppSelector } from "@/app/hooks";

import {
  selectFetchIgnoredUsersState,
  selectProfileIgnoredUsersList,
} from "../../profileSlice";

import { Waterfall } from "@/styles/animations/Waterfall";

import UsersListLoader from "@/components/loaders/UsersListLoader";
import Error from "@/components/general/Error";
import IgnoredUserItem from "./IgnoredUserItem";
import {
  CalloutText,
  FollowedUsersList,
  Wrapper,
} from "./IgnoredUserContainer.styled";

const IgnoredUserContainer = () => {
  const usersList = useAppSelector(selectProfileIgnoredUsersList);
  const { isLoading, error } = useAppSelector(selectFetchIgnoredUsersState);

  return (
    <Wrapper>
      {isLoading ? (
        <UsersListLoader />
      ) : error ? (
        <Error />
      ) : usersList.length === 0 ? (
        <CalloutText>This list is empty!</CalloutText>
      ) : (
        <FollowedUsersList
          variants={Waterfall.container}
          initial="hidden"
          animate="visible"
        >
          {usersList.map((u) => (
            <IgnoredUserItem key={u._id} {...u} />
          ))}
        </FollowedUsersList>
      )}
    </Wrapper>
  );
};

export default IgnoredUserContainer;
