import Bookmark from '@/components/general/Bookmark';
import DotMenu from '@/components/general/DotMenu';
import PostReadTime from '@/components/general/PostReadTime';
import { Title } from '@/components/styled/Title.styled';
import AppImage from '@/features/appImages/components/AppImage';
import { motion } from 'framer-motion';
import { NavLink } from 'react-router-dom';
import styled from 'styled-components';
import tw from 'twin.macro';
import { MenuItem, MenuItemDanger, MenuItemSuccess } from '../styled/MenuItem';
import PostTopic from './PostTopic';

export const Wrapper = styled(motion.li)`
  grid-template-areas: 'head head' 'body preview';
  ${tw`border-b border-gray-200 py-8 last:border-none text-gray-800 grid grid-cols-[1fr,minmax(4rem,8rem)] grid-rows-[auto,auto] gap-y-3 gap-x-16`}
`;

export const StyledLink = styled(NavLink)`
  ${tw`flex items-center`}
`;

// #region PostBody

export const Body = styled.div`
  grid-area: body;
  ${tw`flex flex-col gap-2`}
`;

export const StyledTitle = styled(Title)`
  ${tw`mb-2 text-xl font-bold`}
`;

export const BodyText = styled.div`
  & * {
    color: inherit;
    font-size: inherit;
    font-weight: inherit;
    font-family: inherit;
  }
  ${tw`line-clamp-3 overflow-hidden font-serif leading-6 text-ellipsis`}
`;

// #endregion

// #region PostPreview

export const PreviewImage = styled(AppImage)`
  grid-area: preview;
  ${tw`size-32 object-cover select-none`}
`;

// #endregion

// #region PostBottom

export const Bottom = styled.div`
  ${tw`flex justify-between items-center`}
`;

export const MiscContainer = styled.div`
  ${tw`flex items-center gap-4`}
`;

export const Topic = styled(PostTopic)``;

export const PostReadEstimate = styled(PostReadTime)`
  ${tw`text-sm font-light`}
`;

export const Controls = styled.div`
  ${tw`flex gap-4`}
`;

export const StyledBookmark = styled(Bookmark)`
  ${tw`w-5`}
`;

export const StyledDotMenu = styled(DotMenu)`
  ${tw`w-5`}
`;

export const StyledMenuItem = styled(MenuItem)``;

export const StyledMenuItemSuccess = styled(MenuItemSuccess)``;

export const StyledMenuItemDanger = styled(MenuItemDanger)`
  ${tw`flex justify-end`}
`;

// #endregion
