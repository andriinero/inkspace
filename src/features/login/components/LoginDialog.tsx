import { useEffect, useRef } from 'react';
import { useAppDispatch, useAppSelector } from '@/app/hooks';

import { closeLoginModal, selectIsLoginModalOpen } from '../loginSlice';

import { Wrapper } from './LoginDialog.styled';

const LoginDialog = () => {
  const dialogRef = useRef<HTMLDialogElement>(null);

  const isModalOpen = useAppSelector(selectIsLoginModalOpen);

  const dispatch = useAppDispatch();

  useEffect(() => {
    if (isModalOpen) dialogRef.current?.showModal();
    else dialogRef.current?.close();
  }, [isModalOpen, dispatch]);

  const handleModalClick = () => {
    dispatch(closeLoginModal());
  };

  return (
    <Wrapper ref={dialogRef} onClick={handleModalClick}>
      Login Form
    </Wrapper>
  );
};

export default LoginDialog;
