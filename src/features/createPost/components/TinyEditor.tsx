import { MutableRefObject } from 'react';
import { Editor } from '@tinymce/tinymce-react';
import { Editor as TinyMCEEditor } from 'tinymce';

type TinyEditorProps = {
  editorRef: MutableRefObject<TinyMCEEditor | null>;
};

const TinyEditor = ({ editorRef }: TinyEditorProps) => {
  return (
    <Editor
      textareaName="body"
      apiKey="3igd155ej5mtk3qa3n7kfpjlza31keecuv4bwtxpqxp3lib5"
      onInit={(evt, editor) => (editorRef.current = editor)}
      init={{
        inline_styles: true,
        inline: true,
        min_height: 300,
        plugins:
          'anchor autolink charmap codesample emoticons image link lists media searchreplace table visualblocks wordcount checklist mediaembed casechange export formatpainter pageembed linkchecker a11ychecker tinymcespellchecker permanentpen powerpaste advtable advcode editimage advtemplate ai mentions tinycomments tableofcontents footnotes mergetags autocorrect typography inlinecss',
        toolbar:
          'undo redo | blocks | bold italic underline strikethrough | numlist bullist',
        tinycomments_mode: 'embedded',
        tinycomments_author: 'Author name',
        mergetags_list: [
          { value: 'First.Name', title: 'First Name' },
          { value: 'Email', title: 'Email' },
        ],
        ai_request: (request, respondWith) =>
          respondWith.string(() => Promise.reject('See docs to implement AI Assistant')),
      }}
      initialValue="Tell your story..."
    />
  );
};

export default TinyEditor;
