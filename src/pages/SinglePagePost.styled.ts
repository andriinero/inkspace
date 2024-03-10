import { PostBody } from '@/styles/PostBody.styled';
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

export const Body = styled.div`
  ${PostBody}
`;
