import styled from 'styled-components';
import tw from 'twin.macro';

export const Wrapper = styled.div`
  ${tw`flex justify-center items-center min-h-dvh`}
`;

export const MessageWrapper = styled.div`
  ${tw`flex flex-col justify-center gap-6`}
`;

export const ErrorHeader = styled.h1`
  ${tw`text-4xl font-medium`}
`;

export const ErrorMessage = styled.h2`
  ${tw`text-lg font-light`}
`;
