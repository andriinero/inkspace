import styled from 'styled-components';
import AppImage from '@/features/appImages/components/AppImage';
import { Username } from '@/components/styled/Username.styled';
import { motion } from 'framer-motion';
import { TextButton } from '@/components/styled/TextButton';
import { Link } from 'react-router-dom';
import tw from 'twin.macro';

export const Wrapper = styled(motion.div)`
  ${tw`grid grid-cols-[minmax(50ch,80ch)minmax(30ch,40ch)] justify-center gap-16`}
`;

export const Header = styled.h2`
  ${tw`py-8 text-4xl font-medium`}
`;

export const WrapperMain = styled.div`
  ${tw`flex flex-col p-12`}
`;

export const ContentWrapper = styled.div`
  ${tw`flex flex-col gap-12 py-8 border-b border-gray-200 last:border-b-0`}
`;

export const FormGroupWrapper = styled.div`
  ${tw`flex justify-between gap-10 cursor-pointer`}
`;

export const FieldTitle = styled.span``;

export const FieldValue = styled.span`
  ${tw`font-light`}
`;

export const WrapperAside = styled.div`
  ${tw`flex flex-col p-12 border-l border-gray-200`}
`;

export const ProfileWrapper = styled.div`
  ${tw`flex flex-col gap-4`}
`;

export const ProfileIcon = styled(AppImage)`
  ${tw`size-24 rounded-full`}
`;

export const StyledUserName = styled(Username)`
  ${tw`break-words`}
`;

export const FollowCount = styled.span`
  ${tw`font-light`}
`;

export const SignUpDate = styled.span`
  ${tw`text-sm italic font-light`}
`;

export const DeleteButton = styled(TextButton)`
  ${tw`font-light text-red-800 mt-8 self-end text-base`}
`;

export const UploadImageButton = styled(TextButton)`
  ${tw`self-start`}
`;

export const StyledLink = styled(Link)``;
