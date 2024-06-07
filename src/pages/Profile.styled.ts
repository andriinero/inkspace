import AppImage from '@/features/appImages/components/AppImage';
import { Username } from '@/components/styled/Username.styled';
import { motion } from 'framer-motion';
import { NavLink } from 'react-router-dom';
import styled from 'styled-components';
import tw from 'twin.macro';

export const Wrapper = styled(motion.div)`
  ${tw`grid grid-cols-[minmax(50ch,80ch) minmax(30ch,40ch)] justify-center gap-16 min-h-full`}
`;

export const WrapperMain = styled.main`
  ${tw`py-12 flex flex-col gap-8`}
`;

export const StyledMainUserName = styled(Username)`
  ${tw`py-8 max-w-full text-4xl break-words`}
`;

export const WrapperSection = styled.section`
  ${tw`flex flex-col gap-4`}
`;

export const Header = styled.h2`
  ${tw`self-start text-2xl font-extralight`}
`;

export const WrapperAside = styled.aside`
  ${tw`p-12 flex flex-col border-l border-gray-200`}
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

export const FollowCount = styled.span`
  ${tw`font-light`}
`;

export const SignUpDate = styled.span`
  ${tw`text-sm font-light italic`}
`;

export const StyledEditLink = styled(NavLink)`
  ${tw`text-green-700 text-sm`}
`;

export const UserBio = styled.p`
  ${tw`py-4 text-sm font-light`}
`;
