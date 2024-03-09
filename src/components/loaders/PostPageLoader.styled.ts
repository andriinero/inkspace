import styled from 'styled-components';

export const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  gap: 1rem;

  min-width: 70ch;

  & > * {
    background-color: ${({ theme }) => theme.color.loader_bg};
  }
`;

export const Header = styled.div`
  min-height: 15ch;
`;

export const MiscInfo = styled.div`
  min-height: 10ch;
`;

export const Body = styled.div`
  min-height: 80ch;
`;
