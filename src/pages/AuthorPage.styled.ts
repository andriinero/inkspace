import UserName from '@/components/general/UserName';
import { NavLink } from 'react-router-dom';
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

export const BookmarkWrapper = styled.div`
  padding: 2rem 0;
  margin: 0 2rem;
  border-top: 1px solid ${({ theme }) => theme.color.main_border_feint};
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

export const FollowCount = styled.span`
  display: inline-block;

  font-weight: 300;
`;

export const StyledFollowLink = styled(NavLink)`
  color: ${({ theme }) => theme.color.text_button_follow};
  font-size: 0.8rem;
  font-weight: 400;
  text-decoration: none;
`;
