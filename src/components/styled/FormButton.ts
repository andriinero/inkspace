import styled from 'styled-components';
import { AppButton } from './AppButton.styled';

export const FormButton = styled(AppButton)`
  padding: 0.5rem 0.8rem;
  border: 1px solid ${({ theme }) => theme.color.form_button_border};
  border-radius: 16px;
  background-color: ${({ theme }) => theme.color.form_button_bg};

  color: ${({ theme }) => theme.color.text_primary};
  font-size: 0.8rem;
  font-weight: 300;
`;
