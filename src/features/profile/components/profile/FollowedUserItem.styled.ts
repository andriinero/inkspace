import styled from "styled-components";
import { NavLink } from "react-router-dom";
import { motion } from "framer-motion";
import AppImage from "@/features/appImages/components/AppImage";
import { HollowButton } from "../../../../components/styled/HollowButton";

export const WrapperItem = styled(motion.li)`
  display: flex;
  justify-content: space-between;
  align-items: center;

  padding: 2rem;
`;

export const StyledLink = styled(NavLink)`
  color: inherit;
  text-decoration: none;
`;

export const InfoWrapper = styled.div`
  display: flex;
  gap: 2rem;
`;

export const BioContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 0.4rem;
`;

export const BioContent = styled.p`
  display: -webkit-box;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;

  max-width: 20ch;

  font-size: 0.8rem;
  line-height: 1.2rem;
  text-overflow: ellipsis;

  overflow: hidden;
`;

export const AuthorIcon = styled(AppImage)`
  align-self: flex-start;

  width: 64px;
  height: 64px;
  border-radius: 50%;

  -webkit-user-drag: none;
`;

export const StyledHollowButton = styled(HollowButton)`
  align-self: center;
`;
