import { ChangeEvent, useState } from 'react';
import { Textarea } from './CommentTextarea.styled';
import { FieldErrors } from 'react-hook-form';
import { useAppDispatch } from '@/app/hooks';
import { setIsOverflown } from '../commentEditorSlice';

type CommentTextareaProps = {
  value: string;
  onChange: (...event: unknown[]) => void;
  errors: FieldErrors<{ body: string }>;
};

const CommentTextarea = ({ value, onChange, errors }: CommentTextareaProps) => {
  const [text, setText] = useState<string>(value);

  const dispatch = useAppDispatch();

  const handleTextareaChange = (e: ChangeEvent<HTMLTextAreaElement>): void => {
    const value = e.target.value;

    if (errors.body?.type === 'too_big') dispatch(setIsOverflown(true));

    setText(value);
    onChange(value);
  };

  return (
    <Textarea
      value={text}
      onChange={handleTextareaChange}
      placeholder="What are your thoughts?"
    />
  );
};

export default CommentTextarea;
