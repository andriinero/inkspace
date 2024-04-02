import styled from 'styled-components';

export const InputFile = styled.input`
  &::-webkit-file-upload-button {
    padding: 0.5em;
    border: 1px solid transparent;
    border-radius: 3px;
    background-color: ${({ theme }) => theme.color.main_bg_secondary};

    color: ${({ theme }) => theme.color.success};
  }
`;
