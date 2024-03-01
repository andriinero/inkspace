import styled from 'styled-components';

export const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  gap: 1.5rem;
`;

export const Header = styled.h3`
  font-size: 1rem;
`;

export const AuthorList = styled.ul`
  display: grid;
  grid-template-rows: repeat(3, minmax(50px, 70px));
  gap: 1rem;

  list-style: none;
`;
