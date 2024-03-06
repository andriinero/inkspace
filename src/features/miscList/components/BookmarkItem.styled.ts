import PostReadTime from '@/components/general/PostReadTime';
import TimeAgo from '@/components/general/TimeAgo';
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

export const AuthorName = styled.span`
  font-size: 0.8rem;
  font-weight: 500;
`;

export const BookmarkTitle = styled.h4``;

export const MiscInfo = styled.div`
  display: flex;

  font-size: 0.8rem;
  font-weight: 300;
`;

export const PostDate = styled(TimeAgo)``;

export const TimeToRead = styled(PostReadTime)``;
