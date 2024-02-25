import { Button } from './ActionButton.styled';

type ActionButtonProps = {
  onButtonClick?: () => void;
  value: string;
  className?: string;
};

const ActionButton = ({ onButtonClick, value, className }: ActionButtonProps) => {
  return (
    <Button className={className} onClick={onButtonClick} type="button" value={value} />
  );
};

export default ActionButton;
