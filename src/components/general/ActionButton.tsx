import { FormEvent } from 'react';
import { Button } from './ActionButton.styled';

type ActionButtonProps = {
  className?: string;
  id?: string;
  form?: string;
  onButtonClick?: () => void;
  onSubmitClick?: (e: FormEvent) => void;
  value?: string;
  type?: string;
};

const ActionButton = ({
  className,
  id,
  form,
  onButtonClick,
  onSubmitClick,
  value,
  type = 'button',
}: ActionButtonProps) => {
  return (
    <Button
      className={className}
      id={id}
      form={form}
      onClick={onButtonClick}
      onSubmit={onSubmitClick}
      value={value}
      type={type}
    />
  );
};

export default ActionButton;
