import PostReadTime from '@/components/general/PostReadTime';
import TimeAgo from '@/components/general/TimeAgo';
import UserName from '@/components/general/UserName';
import styled from 'styled-components';

export const WrapperItem = styled.li`
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
`;

export const Header = styled.div`
  display: flex;
  align-items: center;
  gap: 0.5rem;
`;

export const AuthorIcon = styled.img`
  width: 22px;
  height: 22px;
  border-radius: 50%;
`;

export const AuthorName = styled(UserName)`
  font-size: 0.8rem;
`;

export const BookmarkTitle = styled.h4``;

export const MiscInfo = styled.div`
  display: flex;
  align-items: center;
  gap: 0.3rem;

  font-size: 0.8rem;
  font-weight: 300;
`;

export const PostDate = styled(TimeAgo)``;

export const TimeToRead = styled(PostReadTime)``;

export const Divider = styled.span`
  font-size: 1rem;
`;
