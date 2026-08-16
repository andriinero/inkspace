import styled from 'styled-components';
import tw from 'twin.macro';
import Dialog from '@/components/general/Dialog';
import AuthForm from './AuthForm.styled';
import AuthControlsWrapper from './AuthControlsWrapper.styled';
import AuthPanel from './AuthPanel.styled';

export const StyledDialog = styled(Dialog)`
  ${tw`max-w-xl w-full`}
`;

export const StyledAuthPanel = styled(AuthPanel)`
  ${tw`gap-16`}
`;

export const StyledAuthForm = styled(AuthForm)`
  ${tw`gap-16`}
`;

export const HeaderWrapper = styled.div`
  ${tw`flex flex-col gap-8`}
`;

export const Header = styled.h2`
  ${tw`text-2xl font-light font-serif`}
`;

export const SubText = styled.p`
  ${tw`font-light`}
`;

export const InputWrapper = styled.div`
  ${tw`flex flex-col gap-2`}
`;

export const StyledAuthControlsWrapper = styled(AuthControlsWrapper)`
  ${tw`grid grid-cols-2`}
`;
