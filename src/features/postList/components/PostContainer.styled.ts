import { motion } from 'framer-motion';
import styled from 'styled-components';

export const Wrapper = styled.div`
  display: flex;
  flex-direction: column;

  padding: 1rem 0;
`;

export const Header = styled.h1`
  display: flex;
  align-items: center;
  align-self: flex-end;
  gap: 1rem;

  padding-top: 2rem;

  font-weight: 100;
  font-style: italic;
`;

export const CalloutText = styled(motion.h2)`
  display: inline-block;
  align-self: center;

  margin-top: 8rem;

  font-size: 1.4rem;
  font-weight: 200;
  font-style: italic;
  letter-spacing: 0.1rem;
`;

export const PostList = styled(motion.ul)`
  display: flex;
  flex-direction: column;

  padding: 1rem 0;
`;

export const StyledIcon = styled.img`
  width: 16px;

  fill: #fff;
  transition: filter 100ms;

  cursor: pointer;

  &:hover {
    filter: invert(75%) sepia(0%) saturate(303%) hue-rotate(333deg) brightness(102%)
      contrast(82%);
  }
`;
