import { ChangeEvent } from 'react';
import { FieldErrors } from 'react-hook-form';
import { useAppDispatch } from '@/app/hooks';

import { setIsOverflown } from '../commentEditorSlice';

import { Textarea } from './CommentTextarea.styled';

type CommentTextareaProps = {
  value: string;
  onChange: (...event: unknown[]) => void;
  errors: FieldErrors<{ body: string }>;
};

const CommentTextarea = ({ value, onChange, errors }: CommentTextareaProps) => {
  const dispatch = useAppDispatch();

  const handleTextareaChange = (e: ChangeEvent<HTMLTextAreaElement>): void => {
    const value = e.target.value;

    if (errors.body?.type === 'too_big') dispatch(setIsOverflown(true));

    onChange(value);
  };

  return (
    <Textarea
      value={value}
      onChange={handleTextareaChange}
      placeholder="What are your thoughts?"
    />
  );
};

export default CommentTextarea;
