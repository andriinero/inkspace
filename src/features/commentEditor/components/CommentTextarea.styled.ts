import styled from "styled-components";

export const Textarea = styled.textarea`
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
