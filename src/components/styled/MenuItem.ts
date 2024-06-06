import styled from 'styled-components';
import tw from 'twin.macro';

export const MenuItem = styled.li`
  ${tw`flex justify-between items-center gap-4 text-xs font-light list-none cursor-pointer transition`}
`;

export const MenuItemSuccess = styled(MenuItem)`
  color: ${({ theme }) => theme.color.success};
`;

export const MenuItemDanger = styled(MenuItem)`
  color: ${({ theme }) => theme.color.danger};
`;
