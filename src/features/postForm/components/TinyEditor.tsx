import { MutableRefObject } from 'react';

import { Editor as TinyMCEEditor } from 'tinymce';

import { Editor } from '@tinymce/tinymce-react';

type TinyEditorProps = {
  editorRef: MutableRefObject<TinyMCEEditor | null>;
  onChange: (a: string, editor: TinyMCEEditor) => void | undefined;
  value?: string;
};

const TinyEditor = ({ editorRef, onChange, value }: TinyEditorProps) => {
  return (
    <Editor
      textareaName="body"
      apiKey="3igd155ej5mtk3qa3n7kfpjlza31keecuv4bwtxpqxp3lib5"
      onInit={(_, editor) => (editorRef.current = editor)}
      init={{
        inline_styles: true,
        inline: true,
        min_height: 300,
        plugins: '',
        toolbar: 'undo redo blockquote h2 | bold italic underline strikethrough',
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
      onEditorChange={onChange}
      value={value}
    />
  );
};

export default TinyEditor;
