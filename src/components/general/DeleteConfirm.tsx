import {
  Wrapper,
  CancelButton,
  ControlsWrapper,
  DeleteButton,
  Header,
} from "./DeleteConfirm.styled";

type DeleteConfirmProps = {
  headerText: string;
  onDelete: () => void;
  onCancel: () => void;
};

const DeleteConfirm = ({
  headerText,
  onDelete,
  onCancel,
}: DeleteConfirmProps) => {
  return (
    <Wrapper>
      <Header>{headerText}</Header>
      <ControlsWrapper>
        <CancelButton onClick={onCancel} type="button" value="Cancel" />
        <DeleteButton onClick={onDelete} type="button" value="Delete" />
      </ControlsWrapper>
    </Wrapper>
  );
};

export default DeleteConfirm;
