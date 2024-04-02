import styled from 'styled-components';
import AppImage from '@/features/appImages/components/AppImage';
import { Username } from '@/components/styled/Username.styled';
import { motion } from 'framer-motion';
import { TextButton } from '@/components/styled/TextButton';

export const Wrapper = styled(motion.div)`
  display: grid;
  grid-template-columns: minmax(50ch, 80ch) minmax(30ch, 40ch);
  justify-content: center;
  gap: 4rem;

  min-height: 100%;
`;

export const Header = styled.h2`
  margin-bottom: 3rem;

  font-size: 2rem;
  font-weight: 500;
  font-family: ${({ theme }) => theme.font.roboto};
`;

export const WrapperMain = styled.div`
  display: flex;
  flex-direction: column;

  padding: 3rem;
  border-right: 1px solid ${({ theme }) => theme.color.main_border};
`;

export const ContentWrapper = styled.div`
  display: flex;
  flex-direction: column;
  gap: 3rem;

  padding: 2rem 0;

  border-bottom: 1px solid ${({ theme }) => theme.color.main_border_feint};

  &:last-of-type {
    border-bottom: none;
  }
`;

export const FormGroupWrapper = styled.div`
  display: flex;
  justify-content: space-between;
  gap: 2.5rem;

  padding: 0.3 0rem;

  cursor: pointer;

  &:hover {
    filter: invert(75%) sepia(0%) saturate(303%) hue-rotate(333deg) brightness(102%)
      contrast(82%);
  }
`;

export const FieldTitle = styled.span``;

export const FieldValue = styled.span`
  font-weight: 300;
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

export const DeleteButton = styled(TextButton)`
  align-self: flex-end;

  color: ${({ theme }) => theme.color.text_danger};
  font-weight: 300;
`;

export const UploadImageButton = styled(TextButton)`
  align-self: flex-start;

  margin: 0.5rem 0;

  color: ${({ theme }) => theme.color.text_success};
  font-weight: 300;
`;
