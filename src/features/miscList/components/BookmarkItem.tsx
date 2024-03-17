import { PostAuthorData } from '@/types/PostAuthorData';

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
import { Waterfall } from '@/styles/animations/Waterfall';

type BookmarkItemProps = {
  _id: string;
  author: PostAuthorData;
  title: string;
  body: string;
  date: string;
};

const BookmarkItem = ({ _id, author, title, body, date }: BookmarkItemProps) => {
  return (
    <WrapperItem variants={Waterfall.item}>
      <Header>
        <AuthorIcon imageId={author.profile_image} altText="Author Icon" />
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
