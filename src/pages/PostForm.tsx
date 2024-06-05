import { useRef } from "react";
import { Controller, useForm } from "react-hook-form";
import { Navigate, useNavigate } from "react-router-dom";
import { useAppDispatch, useAppSelector } from "@/app/hooks";
import { zodResolver } from "@hookform/resolvers/zod";

import {
  fetchEditTargetPost,
  postPost,
  putEditTargetPost,
  selectEditPostId,
  selectPostIsEditMode,
} from "@/features/postForm/postFormSlice";
import { selectIsAuthenticated } from "@/features/auth/authSlice";
import { addNotification } from "@/features/pushNotification/pushNotificationSlice";

import { Editor as TinyMCEEditor } from "tinymce";
import {
  TPostFormSchema,
  PostFormSchema,
} from "@/types/formSchemas/CreatePostSchema";
import { FadeIn } from "@/styles/animations/FadeIn";
import { ErrorData } from "@/types/fetchResponse/error/ErrorData";
import { PushNotificationType } from "@/types/entityData/StatusNotificationData";

import TinyEditor from "@/features/postForm/components/TinyEditor";
import * as S from "./PostForm.styled";

const PostForm = () => {
  const isAuthenticated = useAppSelector(selectIsAuthenticated);
  const isEditMode = useAppSelector(selectPostIsEditMode);
  const editPostId = useAppSelector(selectEditPostId);

  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  const defaultValues = async (): Promise<TPostFormSchema> => {
    let values = { title: "", body: "", topic: "", image: null };

    if (isEditMode && editPostId) {
      try {
        const data = await dispatch(fetchEditTargetPost(editPostId)).unwrap();

        values = {
          title: data.title,
          body: data.body,
          topic: data.topic.name,
          image: null,
        };
      } catch (err) {
        dispatch(
          addNotification(
            (err as ErrorData).message,
            PushNotificationType.ERROR,
          ),
        );
      }
    }

    return values;
  };

  const editorRef = useRef<TinyMCEEditor | null>(null);
  const {
    control,
    handleSubmit,
    register,
    formState: { errors },
  } = useForm<TPostFormSchema>({
    resolver: zodResolver(PostFormSchema),
    defaultValues,
  });

  if (!isAuthenticated) return <Navigate to="/" />;

  const handlePostSubmit = async (formData: TPostFormSchema): Promise<void> => {
    const response = await dispatch(postPost(formData)).unwrap();

    if (response) {
      dispatch(
        addNotification(
          "post created successfully",
          PushNotificationType.SUCCESS,
        ),
      );
      navigate("/");
    }
  };

  const handlePutSubmit = async (formData: TPostFormSchema): Promise<void> => {
    const response = await dispatch(putEditTargetPost(formData)).unwrap();

    if (response) {
      dispatch(
        addNotification(
          "post saved successfully",
          PushNotificationType.SUCCESS,
        ),
      );
      navigate("/");
    }
  };

  const handleFormSubmit = isEditMode ? handlePutSubmit : handlePostSubmit;

  return (
    <S.Wrapper
      initial={FadeIn.hidden}
      animate={FadeIn.visible}
      transition={FadeIn.transition}
    >
      <S.Header>{isEditMode ? "Edit Post" : "Create Post"}</S.Header>
      <S.Form onSubmit={handleSubmit(handleFormSubmit)} id="create-new-post">
        <S.InputContainer>
          <S.InputItem>
            <S.StyledInputLabel htmlFor="post-title">Title</S.StyledInputLabel>
            <S.StyledInputText
              id="post-title"
              {...register("title")}
              type="text"
              placeholder="Your title..."
            />
            <S.StyledErrorMessage $isVisible={Boolean(errors.title)}>
              {errors.title?.message}
            </S.StyledErrorMessage>
          </S.InputItem>
          <S.InputItem>
            <S.StyledInputLabel htmlFor="post-topic">Topic</S.StyledInputLabel>
            <S.StyledInputText
              {...register("topic")}
              id="post-topic"
              type="text"
              placeholder="Post topic..."
            />
            <S.StyledErrorMessage $isVisible={Boolean(errors.topic)}>
              {errors.topic?.message}
            </S.StyledErrorMessage>
          </S.InputItem>
          <S.InputItem>
            <S.StyledInputLabel htmlFor="post-image">
              Upload thumbnail
            </S.StyledInputLabel>
            <S.StyledInputFile
              {...register("image")}
              id="post-image"
              type="file"
            />
            <S.StyledErrorMessage $isVisible={Boolean(errors.image)}>
              {errors.image?.message}
            </S.StyledErrorMessage>
          </S.InputItem>
        </S.InputContainer>
        <S.InputItem>
          <S.PostWrapper>
            <Controller
              name="body"
              control={control}
              rules={{
                required: { value: true, message: "Post body is required" },
              }}
              render={({ field: { onChange, value } }) => (
                <TinyEditor
                  onChange={onChange}
                  value={value}
                  editorRef={editorRef}
                />
              )}
            />
          </S.PostWrapper>
          <S.StyledErrorMessage $isVisible={Boolean(errors.body)}>
            {errors.body?.message}
          </S.StyledErrorMessage>
        </S.InputItem>
      </S.Form>
      <S.ControlsContainer>
        {isEditMode ? (
          <S.StyledButton
            form="create-new-post"
            type="submit"
            value="Save Edit"
          />
        ) : (
          <S.StyledButton
            form="create-new-post"
            type="submit"
            value="Publish"
          />
        )}
      </S.ControlsContainer>
    </S.Wrapper>
  );
};

export default PostForm;
