import { css } from "styled-components";

export const PostBody = css`
  font-size: 1.25rem;
  font-family: ${({ theme }) => theme.font.times};

  p,
  span,
  em,
  s,
  strong {
    font-size: inherit;
    line-height: 2rem;
    font-family: inherit;
  }

  h2 {
    font-size: inherit;
    line-height: 1.5rem;
  }

  h3 {
    font-size: 1rem;
    line-height: 1.25rem;
  }
`;
