import styled from 'styled-components';

export const Wrapper = styled.div`
  display: grid;
  grid-template-rows: repeat(3, minmax(auto, 275px));
  gap: 2rem;

  padding: 3rem 2rem;
  border-left: 1px solid ${({ theme }) => theme.color.main_border};
`;
