import { useRef } from 'react';
import { Controller, useForm } from 'react-hook-form';
import { Navigate, useNavigate } from 'react-router-dom';
import { Editor as TinyMCEEditor } from 'tinymce';
import { useAppDispatch, useAppSelector } from '@/app/hooks';

import { postPost } from '@/features/createPost/createPostSlice';

import { selectIsAuthenticated } from '@/features/auth/authSlice';

import {
  TCreatePostSchema,
  CreatePostSchema,
} from '@/types/formSchemas/CreatePostSchema';

import { zodResolver } from '@hookform/resolvers/zod';

import {
  StyledErrorMessage,
  Form,
  Header,
  InputContainer,
  InputItem,
  InputLabel,
  StyledInputText,
  PostWrapper,
  SubmitButton,
  Wrapper,
} from './CreatePost.styled';
import TinyEditor from '@/features/createPost/components/TinyEditor';

const CreatePost = () => {
  const {
    control,
    handleSubmit,
    register,
    formState: { errors },
  } = useForm<TCreatePostSchema>({ resolver: zodResolver(CreatePostSchema) });

  const editorRef = useRef<TinyMCEEditor | null>(null);

  const isAuthenticated = useAppSelector(selectIsAuthenticated);

  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  if (!isAuthenticated) return <Navigate to="/" />;

  const handleFormSubmit = async (formData: TCreatePostSchema): Promise<void> => {
    const response = await dispatch(postPost(formData)).unwrap();

    if (response) navigate('/');
  };

  return (
    <Wrapper>
      <Header>Create post</Header>
      <Form onSubmit={handleSubmit(handleFormSubmit)} id="create-new-post">
        <InputContainer>
          <InputItem>
            <InputLabel htmlFor="post-title">Title</InputLabel>
            <StyledInputText
              id="post-title"
              {...register('title', {
                required: 'Title is required',
              })}
              type="text"
              placeholder="Your title..."
            />
            <StyledErrorMessage $isVisible={Boolean(errors.title)}>
              {errors.title?.message}
            </StyledErrorMessage>
          </InputItem>
          <InputItem>
            <InputLabel htmlFor="post-topic">Topic</InputLabel>
            <StyledInputText
              {...register('topic', {
                required: 'Topic is required',
              })}
              id="post-topic"
              type="text"
              placeholder="Post topic..."
            />
            <StyledErrorMessage $isVisible={Boolean(errors.topic)}>
              {errors.topic?.message}
            </StyledErrorMessage>
          </InputItem>
        </InputContainer>
        <InputItem>
          <PostWrapper>
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
          </PostWrapper>
          <StyledErrorMessage $isVisible={Boolean(errors.body)}>
            {errors.body?.message}
          </StyledErrorMessage>
        </InputItem>
      </Form>
      <SubmitButton form="create-new-post" type="submit" value="Publish" />
    </Wrapper>
  );
};

export default CreatePost;
