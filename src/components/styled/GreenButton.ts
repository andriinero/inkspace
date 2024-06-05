import styled from "styled-components";
import { AppButton } from "./AppButton.styled";

export const GreenButton = styled(AppButton)<{ $isDisabled?: boolean }>`
  padding: 0.4rem 0.5rem;
  border: 1px solid ${({ theme }) => theme.color.main_button_border_primary};
  border-radius: 16px;
  background-color: ${({ theme }) => theme.color.main_button_bg_primary};

  color: ${({ theme }) => theme.color.text_primary};
  font-size: 0.8rem;
`;
