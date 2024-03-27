import styled from 'styled-components';

export const MenuItem = styled.li`
  padding: 0.4rem 0.9rem;

  font-size: 0.8rem;
  font-weight: 300;
  list-style-type: none;

  transition: all 100ms;

  &:hover {
    color: ${({ theme }) => theme.color.text_secondary};
  }

  &:first-child {
    padding-top: 0.9rem;
  }

  &:last-child {
    padding-bottom: 0.9rem;
  }
`;

export const MenuItemSuccess = styled(MenuItem)`
  color: ${({ theme }) => theme.color.text_success};
`;

export const MenuItemDanger = styled(MenuItem)`
  color: ${({ theme }) => theme.color.text_danger};
`;
