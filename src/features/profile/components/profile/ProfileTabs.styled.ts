import TabItem from '@/components/general/TabItem';
import { Link } from 'react-router-dom';
import styled from 'styled-components';
import tw from 'twin.macro';

export const Wrapper = styled.div`
  ${tw`flex flex-col`}
`;

export const StyledTabItem = styled(TabItem)(({ isSelected }) => [
  tw`pb-2 flex items-center gap-2 text-sm`,
  isSelected && tw`border-b border-gray-800`,
]);

export const ContentWrapper = styled.div`
  ${tw`flex flex-wrap justify-start gap-10`}
`;

export const ContentPadding = styled.div`
  ${tw`hidden md:block border-b border-gray-200 relative top-[-1px] z-[-1]`}
`;

export const StyledLink = styled(Link)``;
