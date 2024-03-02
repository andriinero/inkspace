import { useState, useRef, ChangeEvent, FormEvent } from 'react';
import { Navigate, useNavigate } from 'react-router-dom';
import { Editor as TinyMCEEditor } from 'tinymce';
import { useAppDispatch, useAppSelector } from '@/app/hooks';

import TinyEditor from '@/features/createPost/components/TinyEditor';

import { selectIsAuthenticated } from '@/features/auth/authSlice';
import { postPost } from '@/features/createPost/createPostSlice';

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

const CreatePost = () => {
  const editorRef = useRef<TinyMCEEditor | null>(null);

  const [title, setTitle] = useState<string>('');
  const [topic, setTopic] = useState<string>('');

  const isAuthenticated = useAppSelector(selectIsAuthenticated);

  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  if (!isAuthenticated) return <Navigate to="/" />;

  const onTitleChange = (e: ChangeEvent<HTMLInputElement>): void => {
    setTitle(e.target.value);
  };

  const onTopicChange = (e: ChangeEvent<HTMLInputElement>): void => {
    setTopic(e.target.value);
  };

  const onFormSubmit = async (e: FormEvent): Promise<void> => {
    e.preventDefault();
    if (editorRef.current) {
      const response = await dispatch(
        postPost({ title: title, topic: topic, body: editorRef.current.getContent() })
      ).unwrap();

      if (response) navigate('/');
    }
  };

  return (
    <Wrapper>
      <Header>Create post</Header>
      <Form onSubmit={onFormSubmit} id="create-new-post">
        <InputContainer>
          <InputItem>
            <InputLabel htmlFor="post-title">Title</InputLabel>
            <InputText
              id="post-title"
              name="title"
              type="text"
              placeholder="Your title..."
              value={title}
              onChange={onTitleChange}
            />
          </InputItem>
          <InputItem>
            <InputLabel htmlFor="post-topic">Topic</InputLabel>
            <InputText
              id="post-topic"
              name="topic"
              type="text"
              placeholder="Post topic..."
              value={topic}
              onChange={onTopicChange}
            />
          </InputItem>
        </InputContainer>
        <PostWrapper>
          <TinyEditor editorRef={editorRef} />
        </PostWrapper>
      </Form>
      <SubmitButton form="create-new-post" type="submit" value="Publish" />
    </Wrapper>
  );
};

export default CreatePost;
