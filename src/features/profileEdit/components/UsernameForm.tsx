import { useForm } from 'react-hook-form';
import { useAppDispatch } from '@/app/hooks';

import { closeModal, openModal } from '../profileEditSlice';

import { CancelButton, ControlsWrapper, Form, SubmitButton } from './UsernameForm.styled';
import { useEffect } from 'react';

const UsernameForm = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const dispatch = useAppDispatch();

  // useEffect(() => {
  //   dispatch(openModal());
  // }, [dispatch]);

  const handleModalClose = (): void => {
    dispatch(closeModal());
  };

  return (
    <Form>
      <ControlsWrapper>
        <SubmitButton type="button" value="Submit" />
        <CancelButton onClick={handleModalClose} type="button" value="Cancel" />
      </ControlsWrapper>
    </Form>
  );
};

export default UsernameForm;
