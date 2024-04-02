import styled from 'styled-components';

export const MenuItem = styled.li`
  display: flex;
  justify-content: space-between;
  align-items: center;
  gap: 1rem;

  font-size: 0.8rem;
  font-weight: 300;
  list-style-type: none;

  transition: all 100ms;

  cursor: pointer;

  &:hover {
    color: ${({ theme }) => theme.color.text_secondary};
  }
`;

export const MenuItemSuccess = styled(MenuItem)`
  color: ${({ theme }) => theme.color.success};
`;

export const MenuItemDanger = styled(MenuItem)`
  color: ${({ theme }) => theme.color.danger};
`;
