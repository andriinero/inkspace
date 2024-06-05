import { WaterfallSlideIn } from "@/styles/animations/WaterfallSlideIn";

import { GeneralPostData } from "@/types/entityData/GeneralPostData";
import PostItemHead from "./PostItemHead";
import * as S from "./GeneralPostItem.styled";
import { useAppDispatch, useAppSelector } from "@/app/hooks";
import {
  fetchProfilePosts,
  selectProfileId,
} from "@/features/profile/profileSlice";
import { useNavigate } from "react-router-dom";
import { enterEditMode } from "@/features/postForm/postFormSlice";
import { addNotification } from "@/features/pushNotification/pushNotificationSlice";
import { PushNotificationType } from "@/types/entityData/StatusNotificationData";
import { deletePost } from "@/features/postList/postListSlice";
import Dialog from "./Dialog";
import DeleteConfirm from "./DeleteConfirm";
import { useState } from "react";

const GeneralPostItem = ({
  _id,
  author,
  title,
  date,
  topic,
  thumbnail_image,
}: GeneralPostData) => {
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState<boolean>(false);

  const currentUserId = useAppSelector(selectProfileId);

  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  const handleOpenDeleteModal = (): void => {
    setIsDeleteModalOpen(true);
  };

  const handleCloseDeleteModal = (): void => {
    setIsDeleteModalOpen(false);
  };

  const handleEnterEditMode = (): void => {
    dispatch(enterEditMode(_id));
    navigate("/post-form");
  };

  const handleDeleteClick = async (): Promise<void> => {
    const response = await dispatch(deletePost(_id)).unwrap();

    if (response) {
      dispatch(
        addNotification(
          "post deleted successfully",
          PushNotificationType.SUCCESS,
        ),
      );
      dispatch(fetchProfilePosts());
      setIsDeleteModalOpen(false);
    }
  };
  const isAuthor = currentUserId === author._id;
  return (
    <S.WrapperItem variants={WaterfallSlideIn.item}>
      <S.ContentWrapper>
        <S.InfoWrapper>
          {!isAuthor && <PostItemHead author={author} postDate={date} />}
          <S.Header>{title}</S.Header>
          <S.StyledPostTopic>Topic: {topic.name}</S.StyledPostTopic>
        </S.InfoWrapper>
        <S.MiscWrapper>
          <S.StyledLink to={`/posts/${_id}`}>
            <S.PreviewImage
              imageId={thumbnail_image}
              placeholderSrc="/empty.png"
              altText="Author Icon"
            />
          </S.StyledLink>
          {isAuthor && (
            <S.ControlsWrapper>
              <S.EditButton
                onClick={handleEnterEditMode}
                value="Edit Post"
                type="button"
              />
              <S.DeleteButton
                onClick={handleOpenDeleteModal}
                value="Delete Post"
                type="button"
              />
            </S.ControlsWrapper>
          )}
        </S.MiscWrapper>
      </S.ContentWrapper>
      <Dialog
        isModalOpen={isDeleteModalOpen}
        onModalClose={handleCloseDeleteModal}
      >
        <DeleteConfirm
          headerText="Are you sure you want to delete this post?"
          onDelete={handleDeleteClick}
          onCancel={handleCloseDeleteModal}
        />
      </Dialog>
    </S.WrapperItem>
  );
};

export default GeneralPostItem;
