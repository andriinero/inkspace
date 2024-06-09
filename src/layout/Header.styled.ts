import styled from 'styled-components';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { GreenButton } from '@/components/styled/GreenButton';
import AppImage from '@/features/appImages/components/AppImage';
import Dropdown from '@/components/general/Dropdown';
import { MenuItem } from '@/components/styled/MenuItem';
import tw from 'twin.macro';

export const Wrapper = styled.header`
  grid-area: header;
  ${tw`sticky z-20 top-0`}
`;

export const ContentWrapper = styled.div(() => [
  tw`py-3 px-6 flex gap-4 justify-between items-center border-b border-gray-200 bg-white z-10 relative`,
]);

export const StyledLink = styled(Link)`
  ${tw`flex justify-center items-center`}
`;

export const Logo = styled(motion.img)`
  ${tw`transition-colors duration-150 cursor-pointer select-none h-5 my-1`}
`;

export const ProfileWrapper = styled.div`
  ${tw`flex gap-8`}
`;

export const NewPostButton = styled.div`
  ${tw`flex items-center cursor-pointer select-none hover:text-gray-800 transition`}
`;

export const NewPostButtonText = styled.span`
  ${tw`ml-2 text-sm font-light`}
`;

export const ProfileIcon = styled(AppImage)`
  ${tw`size-8 rounded-full select-none cursor-pointer`}
`;

export const StyledDropdown = styled(Dropdown)`
  ${tw`mt-12 ml-0`}
`;

export const StyledMenuItem = styled(MenuItem)`
  ${tw`justify-start`}
`;

export const ControlsWrapper = styled.div`
  ${tw`flex gap-5`}
`;

export const StyledGreenButton = styled(GreenButton)``;
