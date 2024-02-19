import styled from 'styled-components';

export const Wrapper = styled.div`
  align-self: flex-start;
  display: grid;
  grid-template-columns: auto auto;
  grid-template-areas:
    'icon main'
    'icon misc';
  column-gap: 1rem;
`;

export const InfoContainer = styled.div`
  display: flex;
  align-items: center;
  gap: 0.4rem;
`;

export const MainContainer = styled(InfoContainer)`
  grid-area: main;
`;

export const MiscContainer = styled(InfoContainer)`
  grid-area: misc;
`;

export const Divider = styled.span`
  font-size: 0.9rem;
`;

export const ProfileIcon = styled.img`
  grid-area: icon;

  width: 48px;
  border-radius: 50%;
`;

export const Name = styled.div``;

export const TimeAgo = styled.span``;

export const ReadTimeEstimate = styled.span``;

export const FollowButton = styled.input``;
