import styled from 'styled-components';

export const Wrapper = styled.div<{ $isSelected: boolean }>`
  padding-bottom: 1rem;
  border-bottom: 1px solid
    ${({ theme, $isSelected }) =>
      $isSelected ? theme.color.form_button_border : theme.color.text_primary};

  color: ${({ theme, $isSelected }) =>
    $isSelected ? theme.color.topic_text_selected : theme.color.text_primary};
  font-weight: 300;

  cursor: pointer;
  user-select: none;
`;
