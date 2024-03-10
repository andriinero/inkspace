import { useRef } from 'react';
import { Navigate, useNavigate } from 'react-router-dom';
import { Editor as TinyMCEEditor } from 'tinymce';
import { useAppDispatch, useAppSelector } from '@/app/hooks';

import TinyEditor from '@/features/createPost/components/TinyEditor';

import { selectIsAuthenticated } from '@/features/auth/authSlice';

import {
  ErrorMessage,
  Form,
  Header,
  InputContainer,
  InputItem,
  InputLabel,
  InputText,
  PostWrapper,
  SubmitButton,
  Wrapper,
} from './CreatePost.styled';
import { Controller, useForm } from 'react-hook-form';
import { postPost } from '@/features/createPost/createPostSlice';

type FormValues = { title: string; topic: string; body: string };

const CreatePost = () => {
  const {
    control,
    handleSubmit,
    register,
    formState: { errors },
  } = useForm<FormValues>();

  const editorRef = useRef<TinyMCEEditor | null>(null);

  const isAuthenticated = useAppSelector(selectIsAuthenticated);

  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  if (!isAuthenticated) return <Navigate to="/" />;

  const onFormSubmit = async (formData: FormValues): Promise<void> => {
    const response = await dispatch(postPost(formData)).unwrap();

    if (response) navigate('/');
  };

  return (
    <Wrapper>
      <Header>Create post</Header>
      <Form onSubmit={handleSubmit(onFormSubmit)} id="create-new-post">
        <InputContainer>
          <InputItem>
            <InputLabel htmlFor="post-title">Title</InputLabel>
            <InputText
              id="post-title"
              {...register('title', {
                required: 'Title is required',
                minLength: { value: 3, message: 'Title is too short' },
                maxLength: { value: 100, message: 'Title is too long' },
              })}
              type="text"
              placeholder="Your title..."
            />
            <ErrorMessage $isVisible={Boolean(errors.title)}>
              {errors.title?.message}
            </ErrorMessage>
          </InputItem>
          <InputItem>
            <InputLabel htmlFor="post-topic">Topic</InputLabel>
            <InputText
              {...register('topic', {
                required: 'Topic is required',
              })}
              id="post-topic"
              type="text"
              placeholder="Post topic..."
            />
            <ErrorMessage $isVisible={Boolean(errors.topic)}>
              {errors.topic?.message}
            </ErrorMessage>
          </InputItem>
        </InputContainer>
        <InputItem>
          <PostWrapper>
            <Controller
              name="body"
              control={control}
              rules={{
                required: {value: true, message: 'Post body is required'},
                minLength: { value: 100, message: 'Post length is too short' },
                maxLength: { value: 10000, message: 'Post length is too long' },
              }}
              render={({ field: { onChange, value } }) => (
                <TinyEditor onChange={onChange} value={value} editorRef={editorRef} />
              )}
            />
          </PostWrapper>
          <ErrorMessage $isVisible={Boolean(errors.body)}>
            {errors.body?.message}
          </ErrorMessage>
        </InputItem>
      </Form>
      <SubmitButton form="create-new-post" type="submit" value="Publish" />
    </Wrapper>
  );
};

export default CreatePost;
