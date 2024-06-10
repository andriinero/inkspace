import {
  Wrapper,
  ControlsWrapper,
  Header,
  StyledDestructiveButton,
  StyledCancelButton,
} from './DeleteConfirmForm.styled';

type DeleteConfirmProps = {
  headerText: string;
  onDelete: () => void;
  onCancel: () => void;
};

const DeleteConfirmForm = ({
  headerText,
  onDelete,
  onCancel,
}: DeleteConfirmProps) => {
  return (
    <Wrapper>
      <Header>{headerText}</Header>
      <ControlsWrapper>
        <StyledCancelButton onClick={onCancel} type="button">
          Cancel
        </StyledCancelButton>
        <StyledDestructiveButton onClick={onDelete} type="button">
          Delete
        </StyledDestructiveButton>
      </ControlsWrapper>
    </Wrapper>
  );
};

export default DeleteConfirmForm;
