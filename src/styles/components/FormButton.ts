import { motion } from 'framer-motion';
import styled from 'styled-components';

export const FormButton = styled(motion.input)`
  padding: 0.5rem 0.8rem;
  border: 1px solid ${({ theme }) => theme.color.form_button_border};
  border-radius: 16px;
  background-color: ${({ theme }) => theme.color.form_button_bg};

  color: ${({ theme }) => theme.color.text_primary};
  font-size: 0.8rem;
  font-weight: 300;

  transition: color 200ms;

  cursor: pointer;

  &:hover {
    color: ${({ theme }) => theme.color.text_secondary};
  }
`;
