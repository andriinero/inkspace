import {
  useState,
  useRef,
  ChangeEvent,
  FormEvent,
  JSXElementConstructor,
  ReactElement,
} from 'react';
import { Navigate, useNavigate } from 'react-router-dom';
import { Editor as TinyMCEEditor } from 'tinymce';
import { useAppDispatch, useAppSelector } from '@/app/hooks';

import TinyEditor from '@/features/createPost/components/TinyEditor';

import { selectIsAuthenticated } from '@/features/auth/authSlice';

import {
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
    formState: { isLoading, errors },
    reset,
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
              {...register('title')}
              type="text"
              placeholder="Your title..."
            />
          </InputItem>
          <InputItem>
            <InputLabel htmlFor="post-topic">Topic</InputLabel>
            <InputText
              {...register('topic')}
              id="post-topic"
              type="text"
              placeholder="Post topic..."
            />
          </InputItem>
        </InputContainer>
        <PostWrapper>
          <Controller
            name="body"
            control={control}
            render={({ field: { onChange, value } }) => (
              <TinyEditor onChange={onChange} value={value} editorRef={editorRef} />
            )}
          />
        </PostWrapper>
      </Form>
      <SubmitButton form="create-new-post" type="submit" value="Publish" />
    </Wrapper>
  );
};

export default CreatePost;
