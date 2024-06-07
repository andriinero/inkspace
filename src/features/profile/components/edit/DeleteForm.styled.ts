import InputDescription from '@/components/general/InputDesciption';
import styled from 'styled-components';

export const Form = styled.form`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  gap: 1rem;
`;

export const Header = styled.h3`
  margin-bottom: 0.8rem;
`;

export const InputWrapper = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  gap: 1rem;

  width: 100%;
`;

export const InputDescriptionDanger = styled(InputDescription)`
  align-self: flex-start;

  color: ${({ theme }) => theme.color.danger};
  font-size: 0.9rem;
  font-weight: 300;
`;

export const ControlsWrapper = styled.div`
  display: flex;
  align-self: flex-end;
  gap: 1rem;
`;
