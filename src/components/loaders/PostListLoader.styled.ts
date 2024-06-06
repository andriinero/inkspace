import styled from 'styled-components';
import tw from 'twin.macro';

export const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  gap: 3rem;

  padding: 2rem;
`;

export const Post = styled.div`
  display: flex;
  flex-direction: column;
  gap: 1rem;

  & > * {
    ${tw`bg-gray-50 animate-pulse`}
  }
`;

export const Header = styled.div`
  min-height: 3ch;
  max-width: 45ch;
`;

export const MiscInfo = styled.div`
  min-height: 3ch;
  max-width: 30ch;
`;

export const Body = styled.div`
  min-height: 12ch;
`;
