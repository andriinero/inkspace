import styled from 'styled-components';
import PostDate from '@/components/general/TimeAgo';
import { NavLink } from 'react-router-dom';
import TimeAgo from '@/components/general/TimeAgo';
import { Username } from '@/components/styled/Username.styled';
import AppImage from '@/features/appImages/components/AppImage';
import DotMenu from '@/components/general/DotMenu';
import tw from 'twin.macro';

export const Wrapper = styled.li`
  ${tw`flex flex-col justify-center gap-3 py-6 px-2 border-b border-gray-100 last:border-none`}
`;

export const StyledLink = styled(NavLink)`
  ${tw`no-underline`}
`;

export const Header = styled.h3`
  ${tw`flex justify-between items-center`}
`;

export const WrapperAuthor = styled.div`
  ${tw`flex items-center gap-3`}
`;

export const WrapperInfo = styled.div`
  ${tw`flex flex-col`}
`;

export const AuthorIcon = styled(AppImage)`
  ${tw`size-8 rounded-full`}
`;

export const StyledUsername = styled(Username)`
  ${tw`font-light text-sm`}
`;

export const ControlsWrapper = styled.div`
  ${tw`flex gap-2`}
`;

export const StyledDotMenu = styled(DotMenu)`
  ${tw`ml-[86px]`}
`;

export const CommentDate = styled(PostDate)`
  ${tw`font-light text-sm`}
`;

export const Body = styled.p`
  ${tw`text-sm leading-normal break-words font-light`}
`;

export const EditDate = styled(TimeAgo)`
  ${tw`self-end text-xs font-light`}
`;
