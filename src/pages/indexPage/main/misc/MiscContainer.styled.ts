import styled from 'styled-components';

export const Wrapper = styled.div`
  display: flex;
  flex-direction: column;

  padding: 2rem;
  border-left: 1px solid ${({ theme }) => theme.color.border};
`;
