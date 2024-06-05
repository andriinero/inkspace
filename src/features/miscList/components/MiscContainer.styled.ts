import styled from 'styled-components';
import tw from 'twin.macro';

export const Wrapper = styled.div(() => [
  `
  display: flex;
  flex-direction: column;
  gap: 3rem;

  padding: 3rem 2rem;
`,
  tw`border-l border-gray-200`,
]);
