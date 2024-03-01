import styled from 'styled-components';

// TODO: add semantics
export const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  gap: 3rem;

  padding: 2rem;
`;

export const Post = styled.div`
  display: flex;
  flex-direction: column;
  gap: 1rem;

  & > * {
    background-color: ${({ theme }) => theme.color.main_bg_secondary};
  }
`;

export const Header = styled.div`
  min-height: 3ch;
  max-width: 45ch;
`;

export const MiscInfo = styled.div`
  min-height: 3ch;
  max-width: 30ch;
`;

export const Body = styled.div`
  min-height: 12ch;
`;
