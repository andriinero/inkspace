import UserName from '@/components/general/UserName';
import styled from 'styled-components';

export const Wrapper = styled.div`
  display: grid;
  grid-template-columns: minmax(50ch, 80ch) minmax(30ch, 40ch);
  justify-content: center;
  gap: 4rem;

  min-height: 100%;
`;

export const WrapperMain = styled.main`
  padding: 3rem 0;
  border-right: 1px solid ${({ theme }) => theme.color.main_border};
`;

export const StyledMainUserName = styled(UserName)`
  padding: 2rem 1rem;
  max-width: 100%;

  font-size: 2.5rem;
  white-space: break-spaces;
  word-wrap: break-word;
`;

export const PostsWrapper = styled.div`
  display: flex;
  flex-direction: column;

  padding: 2rem 0;
  margin: 0 2rem;
  border-top: 1px solid ${({ theme }) => theme.color.main_border_feint};
`;

export const Header = styled.h2`
  align-self: flex-end;

  font-size: 2rem;
  font-weight: 100;
  font-style: italic;
`;

export const WrapperAside = styled.aside`
  display: flex;
  flex-direction: column;

  padding: 3rem 0;
`;

export const ProfileWrapper = styled.div`
  display: flex;
  flex-direction: column;
  gap: 1rem;
`;

export const ProfileIcon = styled.img`
  width: 88px;
  height: auto;
  border-radius: 50%;
`;

export const StyledAsideUserName = styled(UserName)`
  max-width: none;

  white-space: break-spaces;
  word-wrap: break-word;
`;

export const FollowButton = styled.input<{ $isFollowed: boolean }>`
  align-self: flex-start;

  min-width: 11ch;
  padding: 0.5rem 0.8rem;
  border: 1px solid ${({ theme }) => theme.color.topic_border};
  border-radius: 16px;
  background-color: ${({ $isFollowed, theme }) =>
    $isFollowed ? theme.color.topic_bg_selected : theme.color.topic_bg};

  color: ${({ $isFollowed, theme }) =>
    $isFollowed ? theme.color.topic_text_selected : theme.color.text_primary};
  font-size: 0.85rem;

  transition: color 100ms;

  cursor: pointer;
`;
