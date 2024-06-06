import AppImage from '@/features/appImages/components/AppImage';
import { PostBody } from '@/styles/PostBody.styled';
import { motion } from 'framer-motion';
import styled from 'styled-components';
import tw from 'twin.macro';

export const Wrapper = styled.div`
  ${tw`flex flex-col items-center`}
`;

export const PostWrapper = styled(motion.div)`
  ${tw`flex flex-col gap-8 max-w-[70ch] my-16`}
`;

export const Header = styled.h1`
  ${tw`text-4xl font-bold`}
`;

export const PreviewImage = styled(AppImage)`
  ${tw`min-w-full object-cover`}
`;

export const Body = styled.div`
  ${PostBody}
`;
