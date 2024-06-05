import styled from 'styled-components';
import { TextButton } from '../styled/TextButton';

export const Wrapper = styled.div`
  display: flex;
  justify-content: flex-start;
  flex-direction: column;
  gap: 1.5rem;

  z-index: 2;

  padding: 2rem;
  border-radius: 6px;
  background-color: ${({ theme }) => theme.color.dialog_modal_bg};
  box-shadow: 0 0 3em rgb(0 0 0 / 0.3);

  color: ${({ theme }) => theme.color.text_primary};
`;

export const Header = styled.h3`
  font-size: 1rem;
  font-weight: 300;
`;

export const ControlsWrapper = styled.div`
  display: flex;
  justify-content: flex-end;
  gap: 1rem;
`;

export const DeleteButton = styled(TextButton)`
  color: ${({ theme }) => theme.color.danger};
`;

export const CancelButton = styled(TextButton)``;
