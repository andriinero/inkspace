import styled from 'styled-components';

export const Wrapper = styled.div`
  display: grid;
  grid-template-rows: minmax(auto, 300px) repeat(3, minmax(auto, 300px));
  gap: 1rem;

  padding: 3rem 2rem;
  border-left: 1px solid ${({ theme }) => theme.color.main_border};
`;
