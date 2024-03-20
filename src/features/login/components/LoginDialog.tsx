import { useEffect, useRef } from 'react';
import { useAppDispatch, useAppSelector } from '@/app/hooks';

import { closeLoginModal, selectIsLoginModalOpen } from '../loginSlice';

import { LoginWrapper, WrapperBackdrop } from './LoginDialog.styled';
import { FadeIn } from '@/styles/animations/FadeIn';
import { AnimatePresence } from 'framer-motion';

const LoginDialog = () => {
  const dialogRef = useRef<HTMLDivElement>(null);

  const isModalOpen = useAppSelector(selectIsLoginModalOpen);

  useEffect(() => {
    const positionValue = isModalOpen ? 'fixed' : 'static';

    document.querySelector('html')!.style.position = positionValue;
  }, [isModalOpen]);

  const dispatch = useAppDispatch();

  const handleBackdropClick = () => {
    dispatch(closeLoginModal());
  };

  return (
    <AnimatePresence>
      {isModalOpen && (
        <WrapperBackdrop
          ref={dialogRef}
          $isOpen={isModalOpen}
          onClick={handleBackdropClick}
          initial={FadeIn.hidden}
          animate={FadeIn.visible}
          transition={FadeIn.transition}
          exit={FadeIn.hidden}
        >
          <LoginWrapper
            initial={FadeIn.hidden}
            animate={FadeIn.visible}
            transition={FadeIn.transition}
          >
            Content
          </LoginWrapper>
        </WrapperBackdrop>
      )}
    </AnimatePresence>
  );
};

export default LoginDialog;
