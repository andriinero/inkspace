import styled from 'styled-components';

export const Wrapper = styled.div`
  display: flex;
  justify-content: center;

  padding: 4rem 0;
`;

export const PostWrapper = styled.div`
  display: flex;
  flex-direction: column;
  gap: 2rem;

  max-width: 70ch;
`;

export const Header = styled.h1`
  font-size: 2.7rem;
`;

export const Body = styled.p`
  font-size: 1.25rem;
  font-family: 'Times New Roman', Times, serif;
  line-height: 1.8rem;

  & * {
    color: inherit;
    font-size: inherit;
    font-weight: inherit;
    font-family: inherit;
  }
`;
