import styled from 'styled-components';
import { Username } from '@/components/styled/Username.styled';
import AppImage from '@/features/appImages/components/AppImage';
import { motion } from 'framer-motion';
import tw from 'twin.macro';
import { HollowButton } from '@/components/styled/HollowButton';

export const Wrapper = styled(motion.div)`
  ${tw`grid grid-cols-[minmax(50ch,80ch) minmax(30ch,40ch)] justify-center gap-16`}
`;

export const WrapperMain = styled.main`
  ${tw`px-12 mt-16`}
`;

export const StyledMainUserName = styled(Username)`
  ${tw`px-8 py-1 max-w-full text-5xl break-words`}
`;

export const PostsWrapper = styled.div`
  ${tw`flex flex-col p-8`}
`;

export const Header = styled.h2`
  ${tw`text-xl font-extralight`}
`;

export const WrapperAside = styled.aside`
  ${tw`flex flex-col p-12 border-l border-gray-200`}
`;

export const ProfileWrapper = styled.div`
  ${tw`flex flex-col gap-3`}
`;

export const ProfileIcon = styled(AppImage)`
  ${tw`size-24 rounded-full`}
`;

export const StyledAsideUserName = styled(Username)`
  ${tw`break-words`}
`;

export const FollowButton = styled(HollowButton)`
  ${tw`self-start`}
`;

export const FollowCount = styled.span`
  ${tw`font-light`}
`;

export const SignUpDate = styled.span`
  ${tw`text-sm italic font-light`}
`;

export const UserBio = styled.span`
  ${tw`py-4 font-light text-sm`}
`;
