import styled from 'styled-components';
import tw from 'twin.macro';

export const MenuItem = styled.li`
  ${tw`flex justify-between items-center gap-4 text-sm font-light list-none cursor-pointer transition`}
`;

export const MenuItemSuccess = styled(MenuItem)`
  ${tw``}
`;

export const MenuItemDanger = styled(MenuItem)`
  ${tw`text-red-800 font-normal`}
`;
