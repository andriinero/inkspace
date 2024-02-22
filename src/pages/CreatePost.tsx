import { Form, Header, Wrapper, SubmitButton } from './CreatePost.styled';
import { Editor } from '@tinymce/tinymce-react';

const CreatePost = () => {
  return (
    <Wrapper>
      <Header>Create post</Header>
      <Form id="create-new-post">
        <Editor
          apiKey="3igd155ej5mtk3qa3n7kfpjlza31keecuv4bwtxpqxp3lib5"
          init={{
            width: 900,
            height: 600,
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
          initialValue="Type your bright thoughts here!"
        />
      </Form>
      <SubmitButton form="create-new-post" type="submit" value="Publish" />
    </Wrapper>
  );
};

export default CreatePost;
