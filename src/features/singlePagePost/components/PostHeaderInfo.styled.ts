import styled from 'styled-components';
import PostReadTime from '@/components/general/PostReadTime';
import { NavLink } from 'react-router-dom';
import { Username } from '@/components/styled/Username.styled';
import AppImage from '@/features/appImages/components/AppImage';
import { TextButton } from '@/components/styled/TextButton';
import tw from 'twin.macro';

export const Wrapper = styled.div`
  grid-template-areas:
    'icon main'
    'icon misc';
  ${tw`self-start grid grid-cols-[auto,auto] gap-x-4`}
`;

export const StyledLink = styled(NavLink)``;

export const AuthorStyledLink = styled(StyledLink)`
  grid-area: icon;
  ${tw`flex items-center`}
`;

export const HeaderStyledLink = styled(StyledLink)`
  ${tw`flex items-center`}
`;

export const InfoContainer = styled.div`
  ${tw`flex items-center gap-2 text-sm font-light`}
`;

export const MainContainer = styled(InfoContainer)`
  grid-area: main;
`;

export const MiscContainer = styled(InfoContainer)`
  grid-area: misc;
`;

export const Divider = styled.span``;

export const ProfileIcon = styled(AppImage)`
  ${tw`size-12 rounded-full`}
`;

export const Name = styled(Username)`
  ${tw`text-sm`}
`;

export const TopicInfo = styled.span``;

export const TopicName = styled.strong`
  ${tw`cursor-pointer`}
`;

export const PostReadEstimate = styled(PostReadTime)``;

export const FollowButton = styled(TextButton)``;
