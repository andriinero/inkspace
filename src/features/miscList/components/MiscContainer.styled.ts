import styled from "styled-components";

export const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  gap: 3rem;

  padding: 3rem 2rem;
  border-left: 1px solid ${({ theme }) => theme.color.main_border};
`;
