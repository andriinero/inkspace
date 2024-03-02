import ActionButton from '@/components/general/ActionButton';
import styled from 'styled-components';
import CommentCounter from './CommentCounter';

export const Wrapper = styled.div<{ $isOpen: boolean }>`
  display: flex;
  flex-direction: column;

  position: fixed;
  top: 0;
  right: 0;

  width: 400px;
  height: 100dvh;
  padding: 0 1rem;
  background-color: ${({ theme }) => theme.color.comments_bg_primary};
  box-shadow: 0 0 2em rgb(0 0 0 / 0.3);

  transition: transform 500ms;
  transform: ${(props) => (props.$isOpen ? 'translateX(0)' : 'translateX(450px)')};

  overflow: -moz-scrollbars-vertical;
  overflow-y: scroll;

  & > * {
    padding: 1.5rem 0;
  }

  &::-webkit-scrollbar {
    width: 8px;
  }
`;

export const Form = styled.form`
  display: flex;
  flex-direction: column;
  gap: 0.5rem;

  padding: 0.9rem;

  background-color: ${({ theme }) => theme.color.main_bg_secondary};
`;

export const InputText = styled.textarea`
  min-height: 12ch;

  padding: 0.3rem;
  border: 1px solid transparent;
  background-color: transparent;

  color: ${({ theme }) => theme.color.text_primary};

  resize: vertical;

  &:focus {
    outline: none;
  }

  &::-webkit-scrollbar {
    width: 4px;
  }
`;

export const FormWrapper = styled.div`
  &:focus-within {
    ${Form} {
      box-shadow: 0 0 1em rgb(0 0 0 / 0.2);
    }
  }
`;

export const StyledActionButton = styled(ActionButton)`
  align-self: flex-end;

  padding: 0.3rem;

  font-size: 0.7rem;
`;

export const Header = styled.h2`
  font-size: 1.3rem;
`;

export const CommentList = styled.ol`
  display: flex;
  flex-direction: column;
`;

export const WrapperControls = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;

  padding: 0 0.3rem;
`;

export const StyledCounter = styled(CommentCounter)`
  min-width: 7ch;

  color: ${({ theme }) => theme.color.text_primary};
  font-size: 0.8rem;
  font-weight: 300;
  text-align: right;
`;
