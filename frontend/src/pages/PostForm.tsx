import { useAppDispatch, useAppSelector } from '@/app/hooks';
import { zodResolver } from '@hookform/resolvers/zod';
import { useRef } from 'react';
import { Controller, useForm } from 'react-hook-form';
import { Navigate, useNavigate } from 'react-router-dom';

import { selectIsAuthenticated } from '@/features/auth/authSlice';
import {
  fetchEditTargetPost,
  postPost,
  putEditTargetPost,
  selectEditPostId,
  selectPostIsEditMode,
} from '@/features/postForm/postFormSlice';
import { addPushNotification } from '@/features/pushNotification/pushNotificationSlice';

import { FadeIn } from '@/styles/animations/FadeIn';
import { PushNotificationType } from '@/types/entityData/StatusNotificationData';
import { ErrorData } from '@/types/fetchResponse/error/ErrorData';
import {
  PostFormSchema,
  TPostFormSchema,
} from '@/types/formSchemas/CreatePostSchema';
import { Editor as TinyMCEEditor } from 'tinymce';

import TinyEditor from '@/features/postForm/components/TinyEditor';
import * as S from './PostForm.styled';

const PostForm = () => {
  const isAuthenticated = useAppSelector(selectIsAuthenticated);
  const isEditMode = useAppSelector(selectPostIsEditMode);
  const editPostId = useAppSelector(selectEditPostId);

  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  const defaultValues = async (): Promise<TPostFormSchema> => {
    let values = { title: '', body: '', topic: '', image: null };

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
          addPushNotification(
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
    formState: { errors, isLoading, isDirty },
  } = useForm<TPostFormSchema>({
    resolver: zodResolver(PostFormSchema),
    defaultValues,
  });

  if (!isAuthenticated) return <Navigate to="/" />;

  const handlePostSubmit = async (formData: TPostFormSchema): Promise<void> => {
    const response = await dispatch(postPost(formData)).unwrap();

    if (response) {
      dispatch(
        addPushNotification(
          'post created successfully',
          PushNotificationType.SUCCESS,
        ),
      );
      navigate('/');
    }
  };

  const handlePutSubmit = async (formData: TPostFormSchema): Promise<void> => {
    const response = await dispatch(putEditTargetPost(formData)).unwrap();

    if (response) {
      dispatch(
        addPushNotification(
          'post saved successfully',
          PushNotificationType.SUCCESS,
        ),
      );
      navigate('/');
    }
  };

  const isSubmitDisabled = isLoading || !isDirty;

  const handleFormSubmit = isEditMode ? handlePutSubmit : handlePostSubmit;

  return (
    <S.Wrapper
      initial={FadeIn.hidden}
      animate={FadeIn.visible}
      transition={FadeIn.transition}
    >
      <S.Form onSubmit={handleSubmit(handleFormSubmit)} id="create-new-post">
        <S.ControlsContainer>
          {isEditMode ? (
            <S.StyledButton
              disabled={isSubmitDisabled}
              form="create-new-post"
              type="submit"
            >
              Save Edit
            </S.StyledButton>
          ) : (
            <>
              <S.StyledButton disabled form="create-new-post" type="submit">
                Save Draft
              </S.StyledButton>
              <S.StyledButton
                disabled={isSubmitDisabled}
                form="create-new-post"
                type="submit"
              >
                Publish
              </S.StyledButton>
            </>
          )}
        </S.ControlsContainer>
        <S.InputContainer>
          <S.InputItem>
            <S.StyledTitleInput
              id="post-title"
              {...register('title')}
              type="text"
              placeholder="Title..."
            />
            <S.StyledErrorMessage $isVisible={Boolean(errors.title)}>
              {errors.title?.message}
            </S.StyledErrorMessage>
          </S.InputItem>
          <S.InputItem>
            <S.StyledTopicInput
              {...register('topic')}
              id="post-topic"
              type="text"
              placeholder="Topic..."
            />
            <S.StyledErrorMessage $isVisible={Boolean(errors.topic)}>
              {errors.topic?.message}
            </S.StyledErrorMessage>
          </S.InputItem>
          <S.InputItem>
            <S.StyledInputFile {...register('image')} id="post-image">
              Upload Thumbnail
            </S.StyledInputFile>
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
                required: { value: true, message: 'Post body is required' },
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
    </S.Wrapper>
  );
};

export default PostForm;
