import { PostBody } from '@/styles/PostBody.styled';
import { motion } from 'framer-motion';
import styled from 'styled-components';

export const Wrapper = styled.div`
  display: flex;
  align-items: center;
  flex-direction: column;
`;

export const PostWrapper = styled(motion.div)`
  display: flex;
  flex-direction: column;
  gap: 2rem;

  max-width: 70ch;
  margin: 4rem 0;
`;

export const Header = styled.h1`
  font-size: 2.7rem;
`;

export const Body = styled.div`
  ${PostBody}
`;
