import { css } from 'styled-components';
import tw from 'twin.macro';

export const PostBody = css`
  font-family: ${({ theme }) => theme.font.times};
  ${tw`text-xl`}

  p,
  span,
  s,
  em,
  strong {
    font-size: inherit;
    font-family: inherit;
    ${tw`leading-relaxed`}
  }

  strong {
    ${tw`font-sans`}
  }

  h2 {
    ${tw`text-2xl font-bold`}
  }

  h3 {
    ${tw`text-xl font-bold`}
  }
`;
