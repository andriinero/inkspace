import styled from "styled-components";

export const InputText = styled.input`
  padding: 0.3rem 0.4rem;
  border: 1px solid transparent;
  background-color: transparent;

  color: ${({ theme }) => theme.color.text_primary};
  font-size: 1rem;
  text-align: center;

  &:focus {
    outline: none;
  }
`;

export const InputTextUnderline = styled(InputText)`
  border-bottom: 1px solid ${({ theme }) => theme.color.input_text_border};
`;

export const InputTextBackground = styled(InputText)`
  background-color: ${({ theme }) => theme.color.main_bg_primary};
`;
