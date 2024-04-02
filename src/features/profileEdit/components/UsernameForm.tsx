import { useForm } from 'react-hook-form';
import { CancelButton, ControlsWrapper, Form, SubmitButton } from './UsernameForm.styled';

type UsernameFormProps = { onFormClose: () => void };

const UsernameForm = ({ onFormClose }: UsernameFormProps) => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  return (
    <Form>
      <ControlsWrapper>
        <SubmitButton type="button" value="Submit" />
        <CancelButton onClick={onFormClose} type="button" value="Cancel" />
      </ControlsWrapper>
    </Form>
  );
};

export default UsernameForm;
