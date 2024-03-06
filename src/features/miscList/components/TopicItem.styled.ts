import styled from 'styled-components';

export const Wrapper = styled.div<{ $isSelected: boolean }>`
  padding: 0.5rem 0.9rem;
  border: 1px solid ${({ theme }) => theme.color.topic_border};
  border-radius: 16px;
  background-color: ${({ $isSelected, theme }) =>
    $isSelected ? theme.color.topic_bg_selected : theme.color.topic_bg};

  color: ${({ $isSelected, theme }) =>
    $isSelected ? theme.color.topic_bg_selected : 'inherit'};

  cursor: pointer;
`;
