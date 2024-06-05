import styled from "styled-components";
import { Username } from "@/components/styled/Username.styled";
import AppImage from "@/features/appImages/components/AppImage";
import { motion } from "framer-motion";

export const Wrapper = styled(motion.div)`
  display: grid;
  grid-template-columns: minmax(50ch, 80ch) minmax(30ch, 40ch);
  justify-content: center;
  gap: 4rem;

  min-height: 100%;
`;

export const WrapperMain = styled.main`
  padding: 3rem 0;
  border-right: 1px solid ${({ theme }) => theme.color.main_border};
`;

export const StyledMainUserName = styled(Username)`
  padding: 2rem 1rem;
  max-width: 100%;

  font-size: 2.5rem;
  white-space: break-spaces;
  word-wrap: break-word;
`;

export const PostsWrapper = styled.div`
  display: flex;
  flex-direction: column;

  padding: 2rem 0;
  margin: 0 2rem;
  border-top: 1px solid ${({ theme }) => theme.color.main_border_feint};
`;

export const Header = styled.h2`
  font-size: 1.5rem;
  font-weight: 100;
`;

export const WrapperAside = styled.aside`
  display: flex;
  flex-direction: column;

  padding: 3rem 0;
`;

export const ProfileWrapper = styled.div`
  display: flex;
  flex-direction: column;
  gap: 1rem;
`;

export const ProfileIcon = styled(AppImage)`
  width: 88px;
  height: 88px;
  border-radius: 50%;
`;

export const StyledAsideUserName = styled(Username)`
  max-width: none;

  white-space: break-spaces;
  word-wrap: break-word;
`;

export const FollowCount = styled.span`
  display: inline-block;

  font-weight: 300;
`;

export const SignUpDate = styled.span`
  display: inline-block;

  font-size: 0.8rem;
  font-weight: 300;
  font-style: italic;
`;

export const UserBio = styled.span`
  padding: 1rem 0;

  font-size: 0.9rem;
  font-weight: 300;
`;
