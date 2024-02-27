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
import { ChangeEvent, FormEvent, useState } from 'react';

const CreatePost = () => {
  const [title, setTitle] = useState('');
  const [topic, setTopic] = useState('');
  const [bodyContent, setBodyContent] = useState('');

  const onTitleChange = (e: ChangeEvent<HTMLInputElement>) => {
    setTitle(e.target.value);
  };

  const onTopicChange = (e: ChangeEvent<HTMLInputElement>) => {
    setTopic(e.target.value);
  };

  const onBodyChange = (e) => {
    setBodyContent(e.target.value);
    console.log(bodyContent);
  };

  const onFormSubmit = (e: FormEvent) => {
    e.preventDefault();
  };

  return (
    <Wrapper>
      <Header>Create post</Header>
      <Form id="create-new-post">
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
          value={bodyContent}
          onChange={onBodyChange}
          textareaName="body"
          apiKey="3igd155ej5mtk3qa3n7kfpjlza31keecuv4bwtxpqxp3lib5"
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
      <ActionButton
        onSubmitClick={onFormSubmit}
        form="create-new-post"
        type="submit"
        value="Publish"
      />
    </Wrapper>
  );
};

export default CreatePost;
