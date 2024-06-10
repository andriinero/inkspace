import styled from 'styled-components';
import AppImage from '@/features/appImages/components/AppImage';
import { Username } from '@/components/styled/Username.styled';
import { motion } from 'framer-motion';
import { TextButton } from '@/components/styled/TextButton';
import { Link } from 'react-router-dom';
import tw from 'twin.macro';

export const Wrapper = styled(motion.div)`
  ${tw`flex flex-col-reverse sm:flex-row justify-end sm:justify-center max-w-screen-xl w-full`}
`;

export const Header = styled.h2`
  ${tw`py-8 text-4xl font-medium`}
`;

export const WrapperMain = styled.div`
  ${tw`p-4 sm:p-12 max-w-4xl w-full`}
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
  ${tw`p-4 sm:p-12 flex flex-col sm:border-l sm:border-gray-200`}
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
  ${tw`text-red-800 mt-8 self-end text-base`}
`;

export const UploadImageButton = styled(TextButton)`
  ${tw`self-start text-sm`}
`;

export const StyledLink = styled(Link)``;
