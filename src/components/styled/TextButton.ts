import styled from 'styled-components';
import { AppButton } from './AppButton.styled';

export const TextButton = styled(AppButton)`
  border: 1px solid transparent;
  background-color: transparent;

  color: ${({ theme }) => theme.color.success};
  font-size: 1rem;
  text-align: center;
`;
