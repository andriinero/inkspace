import { motion } from 'framer-motion';
import styled from 'styled-components';
import tw from 'twin.macro';

export const Topic = styled(motion.div)(() => [
  tw`bg-gray-100 text-xs py-1 px-2 flex justify-center items-center cursor-pointer rounded-2xl`,
]);
