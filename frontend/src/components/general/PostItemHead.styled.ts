import styled from 'styled-components';
import AppImage from '@/features/appImages/components/AppImage';
import { NavLink } from 'react-router-dom';
import { Username } from '../styled/Username.styled';
import TimeAgo from './TimeAgo';
import tw from 'twin.macro';

export const StyledLink = styled(NavLink)`
  ${tw`flex items-center`}
`;

export const Head = styled.div`
  grid-area: head;
  ${tw`flex items-center gap-2 text-sm font-light`}
`;

export const AuthorIcon = styled(AppImage)`
  ${tw`size-6 rounded-full select-none`}
`;

export const StyledUsername = styled(Username)``;

export const StyledPostDate = styled(TimeAgo)``;

export const Divider = styled.span``;
