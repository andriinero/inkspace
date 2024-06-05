import { motion } from "framer-motion";
import styled from "styled-components";

export const Wrapper = styled.div`
  display: flex;
  justify-content: center;
  flex-direction: column;
  gap: 1.5rem;
`;

export const Header = styled.h3`
  font-size: 1rem;
`;

export const TopicList = styled(motion.ul)`
  display: flex;
  gap: 1rem;
  flex-wrap: wrap;

  list-style: none;
`;
