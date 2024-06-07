import { ReactNode, useEffect } from 'react';

import { FadeIn } from '@/styles/animations/FadeIn';

import { AnimatePresence } from 'framer-motion';
import { Wrapper, Backdrop, ContentWrapper } from './Dialog.styled';

type DialogProps = {
  isModalOpen: boolean;
  onModalClose?: () => void;
  className?: string;
  children?: ReactNode;
};

const Dialog = ({
  isModalOpen,
  onModalClose,
  className,
  children,
}: DialogProps) => {
  useEffect(() => {
    const positionValue = isModalOpen ? 'fixed' : 'static';
    document.querySelector('html')!.style.position = positionValue;
  }, [isModalOpen]);

  return (
    <AnimatePresence>
      {isModalOpen && (
        <Wrapper
          initial={FadeIn.hidden}
          animate={FadeIn.visible}
          transition={{ duration: 0.2 }}
          exit={FadeIn.hidden}
        >
          <ContentWrapper>{children}</ContentWrapper>
          <Backdrop className={className} onClick={onModalClose}></Backdrop>
        </Wrapper>
      )}
    </AnimatePresence>
  );
};

export default Dialog;
