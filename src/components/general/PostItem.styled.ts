import Bookmark from '@/components/general/Bookmark';
import DotMenu from '@/components/general/DotMenu';
import PostReadTime from '@/components/general/PostReadTime';
import { Title } from '@/components/styled/Title.styled';
import AppImage from '@/features/appImages/components/AppImage';
import { motion } from 'framer-motion';
import { NavLink } from 'react-router-dom';
import styled from 'styled-components';
import tw from 'twin.macro';
import { Icon } from '../styled/AppIcon.styled';
import { MenuItem, MenuItemDanger, MenuItemSuccess } from '../styled/MenuItem';
import PostTopic from './PostTopic';

export const Wrapper = styled(motion.li)(() => [
  `
  display: grid;
  grid-template-columns: 1fr minmax(64px, 128px);
  grid-template-rows: auto auto;
  grid-template-areas: 'head head' 'body preview';
  row-gap: 0.7rem;
  column-gap: 4rem;
`,
  tw`border-b border-gray-200 py-8 last:border-none text-gray-800`,
]);

export const StyledLink = styled(NavLink)`
  display: flex;
  align-items: center;
  color: inherit;
  text-decoration: none;
`;

// #region PostBody

export const Body = styled.div`
  grid-area: body;
  display: flex;
  flex-direction: column;
  gap: 0.4rem;
`;

export const StyledTitle = tw(Title)`mb-2 text-2xl font-bold`;
/**
 *
 */
export const BodyText = styled.div`
  display: -webkit-box;
  -webkit-line-clamp: 3;
  -webkit-box-orient: vertical;

  overflow: hidden;

  font-family: 'Times New Roman', Times, serif;
  line-height: 1.5rem;
  text-overflow: ellipsis;

  & * {
    color: inherit;
    font-size: inherit;
    font-weight: inherit;
    font-family: inherit;
  }
`;

// #endregion

// #region PostPreview

export const PreviewImage = styled(AppImage)`
  grid-area: preview;
  width: 128px;
  height: 128px;
  object-fit: cover;

  -webkit-user-drag: none;
`;

// #endregion

// #region PostBottom

export const Bottom = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

export const MiscContainer = styled.div`
  display: flex;
  align-items: center;
  gap: 1rem;
`;

export const Topic = styled(PostTopic)``;

export const PostReadEstimate = styled(PostReadTime)`
  font-size: 0.75rem;
  font-weight: 300;
`;

export const Controls = styled.div`
  display: flex;
  gap: 1rem;
`;

export const StyledBookmark = styled(Bookmark)`
  width: 20px;
`;

export const StyledDotMenu = styled(DotMenu)`
  width: 20px;
`;

export const StyledMenuItem = styled(MenuItem)``;

export const StyledMenuItemSuccess = styled(MenuItemSuccess)``;

export const StyledMenuItemDanger = styled(MenuItemDanger)`
  display: flex;
  justify-content: flex-end;
`;

export const StyledIcon = styled(Icon)``;

// #endregion
