import Post from '@/types/Post';

import {
  AuthorIcon,
  AuthorName,
  BookmarkTitle,
  Divider,
  Header,
  MiscInfo,
  StyledLink,
  WrapperItem,
} from './BookmarkItem.styled';
import TimeAgo from '@/components/general/TimeAgo';
import PostReadTime from '@/components/general/PostReadTime';
import { Waterfall } from '@/styles/components/animations/Waterfall';

const BookmarkItem = ({ _id, author, title, body, date }: Post) => {
  return (
    <WrapperItem variants={Waterfall.item}>
      <Header>
        <AuthorIcon src="/portrait-placeholder.png" alt="Author Icon" />
        <StyledLink to={`/authors/${author._id}`}>
          <AuthorName>{author.username}</AuthorName>
        </StyledLink>
      </Header>
      <StyledLink to={`/posts/${_id}`}>
        <BookmarkTitle>{title}</BookmarkTitle>
      </StyledLink>
      <MiscInfo>
        <TimeAgo date={date} />
        <Divider>·</Divider>
        <PostReadTime bodyLength={body.length} />
      </MiscInfo>
    </WrapperItem>
  );
};

export default BookmarkItem;
