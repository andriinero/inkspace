import { useAppSelector } from '@/app/hooks';

import {
  selectFetchFollowedUsersState,
  selectProfileFollowedUsersList,
} from '../profileSlice';

import { Waterfall } from '@/styles/animations/Waterfall';

import UsersListLoader from '@/components/loaders/UsersListLoader';
import Error from '@/components/general/Error';
import { CalloutText, FollowedUsersList, Wrapper } from './FollowedUserContainer.styled';
import FollowedUserItem from '@/features/profile/components/FollowedUserItem';

const FollowedUserContainer = () => {
  const usersList = useAppSelector(selectProfileFollowedUsersList);
  const { isLoading, error } = useAppSelector(selectFetchFollowedUsersState);

  return (
    <Wrapper>
      {isLoading ? (
        <UsersListLoader />
      ) : error ? (
        <Error />
      ) : usersList.length === 0 ? (
        <CalloutText>No one followed yet!</CalloutText>
      ) : (
        <FollowedUsersList
          variants={Waterfall.container}
          initial="hidden"
          animate="visible"
        >
          {usersList.map((u) => (
            <FollowedUserItem key={u._id} {...u} />
          ))}
        </FollowedUsersList>
      )}
    </Wrapper>
  );
};

export default FollowedUserContainer;
