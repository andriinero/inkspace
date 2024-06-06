import styled from 'styled-components';
import tw from 'twin.macro';

export const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  gap: 1rem;

  margin: 4rem 0;
  min-width: 70ch;

  & > * {
    ${tw`animate-pulse bg-gray-50`}
  }
`;

export const Header = styled.div`
  min-height: 15ch;
`;

export const MiscInfo = styled.div`
  min-height: 10ch;
`;

export const Body = styled.div`
  min-height: 80ch;
`;
