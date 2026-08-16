import styled from 'styled-components';
import { NavLink } from 'react-router-dom';
import { Username } from '@/components/styled/Username.styled';
import { motion } from 'framer-motion';
import { Title } from '@/components/styled/Title.styled';
import AppImage from '@/features/appImages/components/AppImage';
import tw from 'twin.macro';

export const WrapperItem = styled(motion.li)`
  ${tw`flex flex-col gap-2`}
`;

export const Header = styled.div`
  ${tw`flex items-center gap-2`}
`;

export const StyledLink = styled(NavLink)`
  ${tw`flex items-center gap-2`}
`;

export const AuthorIcon = styled(AppImage)`
  ${tw`size-6 rounded-full`}
`;

export const AuthorName = styled(Username)`
  ${tw`text-sm`}
`;

export const TopicWrapper = styled.div`
  ${tw`flex items-center gap-2 text-sm font-light`}
`;

export const TopicName = styled.span`
  ${tw`text-sm font-medium cursor-pointer`}
`;

export const PostTitle = styled(Title)`
  ${tw`font-bold`}
`;
