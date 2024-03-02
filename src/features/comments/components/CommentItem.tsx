import { Author } from '@/types/Author';
import {
  AuthorIcon,
  AuthorName,
  Body,
  CommentDate,
  DeleteIcon,
  Header,
  StyledLink,
  Wrapper,
  WrapperAuthor,
  WrapperInfo,
} from './CommentItem.styled';
import { useAppDispatch, useAppSelector } from '@/app/hooks';
import { selectCurrentUserId } from '@/features/auth/authSlice';
import { deleteComment } from '../commentsSlice';

type CommentProps = {
  _id: string;
  post: string;
  author: Author;
  title: string;
  body: string;
  date: string;
};

const Comment = ({ _id, post, author, title, body, date }: CommentProps) => {
  const currentUserId = useAppSelector(selectCurrentUserId);

  const dispatch = useAppDispatch();

  const handleDeleteClick = () => {
    dispatch(deleteComment(_id));
  };

  const ownedByUser = currentUserId === author._id;
  return (
    <Wrapper>
      <Header>
        <WrapperAuthor>
          <AuthorIcon src="/portrait-placeholder.png" alt="Author Icon" />
          <WrapperInfo>
            <StyledLink to={`/authors/${author._id}`}>
              <AuthorName>{author.username}</AuthorName>
            </StyledLink>
            <CommentDate date={date} />
          </WrapperInfo>
        </WrapperAuthor>
        {ownedByUser && (
          <DeleteIcon
            onClick={handleDeleteClick}
            src="/delete.svg"
            alt="Delete Comment Icon"
          />
        )}
      </Header>
      <Body>{body}</Body>
    </Wrapper>
  );
};

export default Comment;
