import { Button } from './ActionButton.styled';

type ActionButtonProps = {
  className?: string;
  id?: string;
  form?: string;
  onButtonClick?: () => void;
  value?: string;
  type?: string;
};

const ActionButton = ({
  className,
  id,
  form,
  onButtonClick,
  value,
  type = 'button',
}: ActionButtonProps) => {
  return (
    <Button
      className={className}
      id={id}
      form={form}
      onClick={onButtonClick}
      type={type}
      value={value}
    />
  );
};

export default ActionButton;
