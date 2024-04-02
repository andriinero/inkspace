import styled from 'styled-components';
import AppImage from '@/features/appImages/components/AppImage';
import { Username } from '@/components/styled/Username.styled';
import { motion } from 'framer-motion';

export const Wrapper = styled(motion.div)`
  display: grid;
  grid-template-columns: minmax(50ch, 80ch) minmax(30ch, 40ch);
  justify-content: center;
  gap: 4rem;

  min-height: 100%;
`;

export const WrapperMain = styled.div`
  display: flex;
  flex-direction: column;
  gap: 3rem;

  padding: 3rem;
  border-right: 1px solid ${({ theme }) => theme.color.main_border};
`;

export const Header = styled.h2`
  font-size: 1.4rem;
  font-weight: 100;
  font-family: ${({ theme }) => theme.font.roboto};
`;

export const FormGroupWrapper = styled.div`
  display: flex;
  flex-direction: column;
  gap: 2.5rem;
`;

export const WrapperAside = styled.div`
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

export const StyledUserName = styled(Username)`
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

export const ModalWrapper = styled.div``;
