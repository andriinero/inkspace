import { Author } from '@/types/Author';
import {
  AuthorIcon,
  AuthorName,
  Body,
  CommentDate,
  ControlsIcon,
  ControlsWrapper,
  EditIcon,
  Header,
  StyledLink,
  Wrapper,
  WrapperAuthor,
  WrapperInfo,
} from './CommentItem.styled';
import { useAppDispatch, useAppSelector } from '@/app/hooks';
import { selectCurrentUserId } from '@/features/auth/authSlice';
import { deleteComment } from '../commentsSlice';
import { enterEditMode, exitEditMode } from '@/features/commentEditor/commentEditorSlice';

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

  const handleEditClick = () => {
    dispatch(enterEditMode());
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
          <ControlsWrapper>
            <EditIcon onClick={handleEditClick} src="/edit.svg" alt="Edit Comment Icon" />
            <ControlsIcon
              onClick={handleDeleteClick}
              src="/delete.svg"
              alt="Delete Comment Icon"
            />
          </ControlsWrapper>
        )}
      </Header>
      <Body>{body}</Body>
    </Wrapper>
  );
};

export default Comment;
