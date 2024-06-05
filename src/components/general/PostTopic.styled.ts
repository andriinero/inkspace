import { motion } from "framer-motion";
import styled from "styled-components";

export const Topic = styled(motion.div)`
  display: flex;
  justify-content: center;
  align-items: center;

  padding: 0.3rem 0.5rem;
  border: 1px solid ${({ theme }) => theme.color.topic_border};
  border-radius: 16px;
  background-color: ${({ theme }) => theme.color.topic_bg};

  font-size: 0.8rem;

  cursor: pointer;
`;
