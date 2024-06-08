import styled from 'styled-components';
import { NavLink } from 'react-router-dom';
import { motion } from 'framer-motion';
import AppImage from '@/features/appImages/components/AppImage';
import PostTopic from './PostTopic';
import { TextButton } from '../styled/TextButton';
import tw from 'twin.macro';

export const WrapperItem = styled(motion.li)`
  ${tw`flex flex-col gap-4 p-4 rounded border-b border-gray-200 last:border-none`}
`;

export const ContentWrapper = styled.div`
  ${tw`flex justify-between gap-16`}
`;

export const Header = styled.h2``;

export const InfoWrapper = styled.div`
  ${tw`p-4 flex flex-col justify-between items-center gap-3`}
`;

export const StyledPostTopic = styled(PostTopic)``;

export const StyledLink = styled(NavLink)``;

export const MiscWrapper = styled.div`
  ${tw`flex flex-col items-center gap-4`}
`;

export const PreviewImage = styled(AppImage)`
  ${tw`size-32 rounded object-cover`}
`;

export const ControlsWrapper = styled.div`
  ${tw`flex self-end gap-8`}
`;

export const EditButton = styled(TextButton)``;
