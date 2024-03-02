import styled from "styled-components";
import ActionButton from "@/components/general/ActionButton";
import CommentCounter from "../../comments/components/CommentCounter";

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
