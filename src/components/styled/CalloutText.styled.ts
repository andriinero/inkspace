import { FadeInSlide } from "@/styles/animations/FadeInSlide";
import { motion } from "framer-motion";
import styled from "styled-components";

export const CalloutText = styled(motion.h2).attrs(() => ({
  initial: FadeInSlide.hidden,
  animate: FadeInSlide.visible,
  transition: FadeInSlide.transition,
}))`
  display: inline-block;
  align-self: center;

  margin-top: 8rem;

  font-size: 1.4rem;
  font-weight: 200;
  font-style: italic;
  letter-spacing: 0.1rem;
`;
