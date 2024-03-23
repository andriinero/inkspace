import { PostAuthorData } from '@/types/itemData/GeneralAuthorData';

import { Waterfall } from '@/styles/animations/Waterfall';

import TimeAgo from '@/components/general/TimeAgo';
import PostReadTime from '@/components/general/PostReadTime';
import * as S from './BookmarkItem.styled';

type BookmarkItemProps = {
  _id: string;
  author: PostAuthorData;
  title: string;
  body: string;
  date: string;
};

const BookmarkItem = ({ _id, author, title, body, date }: BookmarkItemProps) => {
  return (
    <S.WrapperItem variants={Waterfall.item}>
      <S.Header>
        <S.AuthorIcon imageId={author.profile_image} altText="Author Icon" />
        <S.StyledLink to={`/authors/${author._id}`}>
          <S.AuthorName>{author.username}</S.AuthorName>
        </S.StyledLink>
      </S.Header>
      <S.StyledLink to={`/posts/${_id}`}>
        <S.BookmarkTitle>{title}</S.BookmarkTitle>
      </S.StyledLink>
      <S.MiscInfo>
        <TimeAgo date={date} />
        <S.Divider>·</S.Divider>
        <PostReadTime bodyLength={body.length} />
      </S.MiscInfo>
    </S.WrapperItem>
  );
};

export default BookmarkItem;
