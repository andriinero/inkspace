import { useRef } from 'react';
import { Controller, useForm } from 'react-hook-form';
import { Navigate, useNavigate } from 'react-router-dom';
import { useAppDispatch, useAppSelector } from '@/app/hooks';
import { zodResolver } from '@hookform/resolvers/zod';

import { postPost } from '@/features/postForm/postFormSlice';
import { selectIsAuthenticated } from '@/features/auth/authSlice';

import { Editor as TinyMCEEditor } from 'tinymce';
import {
  TCreatePostSchema,
  CreatePostSchema,
} from '@/types/formSchemas/CreatePostSchema';

import TinyEditor from '@/features/postForm/components/TinyEditor';
import * as S from './PostForm.styled';

const CreatePost = () => {
  const editorRef = useRef<TinyMCEEditor | null>(null);
  const {
    control,
    handleSubmit,
    register,
    formState: { errors },
  } = useForm<TCreatePostSchema>({ resolver: zodResolver(CreatePostSchema) });

  const isAuthenticated = useAppSelector(selectIsAuthenticated);

  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  if (!isAuthenticated) return <Navigate to="/" />;

  const handleFormSubmit = async (formData: TCreatePostSchema): Promise<void> => {
    const response = await dispatch(postPost(formData)).unwrap();

    if (response) navigate('/');
  };

  return (
    <S.Wrapper>
      <S.Header>Create post</S.Header>
      <S.Form onSubmit={handleSubmit(handleFormSubmit)} id="create-new-post">
        <S.InputContainer>
          <S.InputItem>
            <S.StyledInputLabel htmlFor="post-title">Title</S.StyledInputLabel>
            <S.StyledInputText
              id="post-title"
              {...register('title', {
                required: 'Title is required',
              })}
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
              {...register('topic', {
                required: 'Topic is required',
              })}
              id="post-topic"
              type="text"
              placeholder="Post topic..."
            />
            <S.StyledErrorMessage $isVisible={Boolean(errors.topic)}>
              {errors.topic?.message}
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
                <TinyEditor onChange={onChange} value={value} editorRef={editorRef} />
              )}
            />
          </S.PostWrapper>
          <S.StyledErrorMessage $isVisible={Boolean(errors.body)}>
            {errors.body?.message}
          </S.StyledErrorMessage>
        </S.InputItem>
      </S.Form>
      <S.ControlsContainer>
        <S.SaveDraftButton form="create-new-post" type="button" value="Save Draft" />
        <S.PublishButton form="create-new-post" type="submit" value="Publish" />
      </S.ControlsContainer>
    </S.Wrapper>
  );
};

export default CreatePost;
