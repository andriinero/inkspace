import styled from "styled-components";
import { MenuItem } from "./MenuItem";

export const SpecialMenuItem = styled(MenuItem)`
  color: ${({ theme }) => theme.color.button_special_text};
`;