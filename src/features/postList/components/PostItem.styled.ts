import styled from 'styled-components';
import { NavLink } from 'react-router-dom';
import Bookmark from '@/components/icons/Bookmark';
import DotMenu from '@/components/general/DotMenu';

import PostReadTime from '@/components/general/PostReadTime';

export const Wrapper = styled.div`
  display: grid;
  grid-template-columns: 1fr minmax(64px, 128px);
  grid-template-rows: auto auto;
  grid-template-areas: 'head head' 'body preview';
  row-gap: 0.7rem;
  column-gap: 4rem;

  padding: 2rem 0;
  max-width: 75ch;
  border-bottom: 1px solid ${({ theme }) => theme.color.main_border_feint};

  &:last-child {
    border-bottom: none;
  }
`;

export const StyledLink = styled(NavLink)`
  color: inherit;
  text-decoration: none;
`;

// #region PostHead

export const Head = styled.div`
  grid-area: head;
  display: flex;
  align-items: center;
  gap: 0.4rem;

  font-weight: 300;
  font-size: 0.9rem;
`;

export const AuthorIcon = styled.img`
  max-width: 24px;
  border-radius: 50%;
  object-fit: contain;

  -webkit-user-drag: none;
`;

export const Divider = styled.span`
  font-size: 0.9rem;
`;

export const AuthorName = styled.span`
  display: inline-block;

  font-weight: 500;
`;

// #endregion

// #region PostBody

export const Body = styled.div`
  grid-area: body;
`;

export const Title = styled.h3`
  padding-bottom: 0.5rem;

  font-size: 1.25rem;
`;

export const BodyText = styled.div`
  display: -webkit-box;
  -webkit-line-clamp: 3;
  -webkit-box-orient: vertical;

  max-width: 100%;
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

export const Preview = styled.div`
  grid-area: preview;
`;

export const PreviewImage = styled.img`
  max-width: 128px;
  object-fit: contain;

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

export const Topic = styled.span`
  display: flex;
  justify-content: center;
  align-items: center;

  padding: 0.3rem 0.5rem;
  border: 1px solid ${({ theme }) => theme.color.topic_border};
  border-radius: 16px;
  background-color: ${({ theme }) => theme.color.topic_bg};

  font-size: 0.8rem;

  cursor: pointer;
`;

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

export const MenuItem = styled.li`
  padding: 0.4rem 0.9rem;

  font-size: 0.9rem;
  font-weight: 300;
  list-style-type: none;

  transition: color 100ms, background-color 100ms;

  cursor: pointer;

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

// #endregion
