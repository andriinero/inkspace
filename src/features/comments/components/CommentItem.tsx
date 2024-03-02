import { Author } from '@/types/Author';
import {
  AuthorIcon,
  AuthorName,
  Body,
  Bottom,
  CommentDate,
  Header,
  StyledLink,
  Wrapper,
  WrapperInfo,
} from './CommentItem.styled';

type CommentProps = {
  _id: string;
  post: string;
  author: Author;
  title: string;
  body: string;
  date: string;
};

const Comment = ({ _id, post, author, title, body, date }: CommentProps) => {
  return (
    <Wrapper>
      <Header>
        <AuthorIcon src="/portrait-placeholder.png" alt="Author Icon" />
        <WrapperInfo>
          <StyledLink to={`/authors/${author._id}`}>
            <AuthorName>{author.username}</AuthorName>
          </StyledLink>
          <CommentDate date={date} />
        </WrapperInfo>
      </Header>
      <Body>{body}</Body>
      <Bottom></Bottom>
    </Wrapper>
  );
};

export default Comment;
