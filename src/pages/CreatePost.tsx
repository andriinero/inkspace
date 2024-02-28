import ActionButton from '@/components/general/ActionButton';
import {
  Form,
  Header,
  InputContainer,
  InputLabel,
  InputText,
  Wrapper,
} from './CreatePost.styled';
import { Editor } from '@tinymce/tinymce-react';
import { Editor as TinyMCEEditor } from 'tinymce';
import { ChangeEvent, FormEvent, useRef, useState } from 'react';
import { useAppDispatch } from '@/app/hooks';
import { postPost } from '@/features/createPost/createPostSlice';
import { useNavigate } from 'react-router-dom';

const CreatePost = () => {
  const editorRef = useRef<TinyMCEEditor | null>(null);

  const [title, setTitle] = useState<string>('');
  const [topic, setTopic] = useState<string>('');

  const dispatch = useAppDispatch();
  const navigate = useNavigate();

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
          <InputLabel htmlFor="post-title">Title</InputLabel>
          <InputText
            id="post-title"
            name="title"
            type="text"
            placeholder="Your title..."
            value={title}
            onChange={onTitleChange}
          />
        </InputContainer>
        <InputContainer>
          <InputLabel htmlFor="post-topic">Topic</InputLabel>
          <InputText
            id="post-topic"
            name="topic"
            type="text"
            placeholder="Post topic..."
            value={topic}
            onChange={onTopicChange}
          />
        </InputContainer>
        <Editor
          textareaName="body"
          apiKey="3igd155ej5mtk3qa3n7kfpjlza31keecuv4bwtxpqxp3lib5"
          onInit={(evt, editor) => (editorRef.current = editor)}
          init={{
            width: 900,
            height: 500,
            plugins:
              'anchor autolink charmap codesample emoticons image link lists media searchreplace table visualblocks wordcount checklist mediaembed casechange export formatpainter pageembed linkchecker a11ychecker tinymcespellchecker permanentpen powerpaste advtable advcode editimage advtemplate ai mentions tinycomments tableofcontents footnotes mergetags autocorrect typography inlinecss',
            toolbar:
              'undo redo | blocks fontfamily fontsize | bold italic underline strikethrough | link image media table mergetags | addcomment showcomments | spellcheckdialog a11ycheck typography | align lineheight | checklist numlist bullist indent outdent | emoticons charmap | removeformat',
            tinycomments_mode: 'embedded',
            tinycomments_author: 'Author name',
            mergetags_list: [
              { value: 'First.Name', title: 'First Name' },
              { value: 'Email', title: 'Email' },
            ],
            ai_request: (request, respondWith) =>
              respondWith.string(() =>
                Promise.reject('See docs to implement AI Assistant')
              ),
            content_style:
              'body {font-family: Times New Roman, Arial, sans-serif; font-size: 16px;}',
          }}
          initialValue="Tell your story..."
        />
      </Form>
      <ActionButton form="create-new-post" type="submit" value="Publish" />
    </Wrapper>
  );
};

export default CreatePost;
