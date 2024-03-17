import { useAppDispatch, useAppSelector } from '@/app/hooks';

import { PostAuthorData } from '@/types/itemData/PostAuthorData';

import { selectCurrentUserId } from '@/features/auth/authSlice';
import { deleteComment } from '../commentListSlice';
import {
  enterEditMode,
  selectCommentIsEditMode,
} from '@/features/commentEditor/commentEditorSlice';

import {
  AuthorIcon,
  StyledUsername,
  Body,
  CommentDate,
  ControlsIcon,
  ControlsWrapper,
  EditDate,
  EditIcon,
  Header,
  StyledLink,
  Wrapper,
  WrapperAuthor,
  WrapperInfo,
} from './CommentItem.styled';

type CommentProps = {
  _id: string;
  post: string;
  author: PostAuthorData;
  title: string;
  body: string;
  date: string;
  edit_date?: string;
};

const CommentItem = ({ _id, post, author, title, body, date, edit_date }: CommentProps) => {
  const currentUserId = useAppSelector(selectCurrentUserId);
  const isEditMode = useAppSelector(selectCommentIsEditMode);

  const dispatch = useAppDispatch();

  const handleDeleteClick = () => {
    dispatch(deleteComment(_id));
  };

  const handleEditClick = () => {
    dispatch(enterEditMode({ commentId: _id, commentBody: body }));
  };

  const ownedByUser = currentUserId === author._id;
  return (
    <Wrapper>
      <Header>
        <WrapperAuthor>
          <AuthorIcon imageId={author.profile_image} altText="Author Icon" />
          <WrapperInfo>
            <StyledLink to={`/authors/${author._id}`}>
              <StyledUsername>{author.username}</StyledUsername>
            </StyledLink>
            <CommentDate date={date} />
          </WrapperInfo>
        </WrapperAuthor>
        {ownedByUser && !isEditMode && (
          <ControlsWrapper>
            <EditIcon
              onIconClick={handleEditClick}
              src="/edit.svg"
              alt="Edit Comment Icon"
            />
            <ControlsIcon
              onIconClick={handleDeleteClick}
              src="/delete.svg"
              alt="Delete Comment Icon"
            />
          </ControlsWrapper>
        )}
      </Header>
      <Body>{body}</Body>
      {edit_date && <EditDate date={edit_date}>last edit: </EditDate>}
    </Wrapper>
  );
};

export default CommentItem;
