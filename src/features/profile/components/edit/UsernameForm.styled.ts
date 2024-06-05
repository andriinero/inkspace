import { ErrorMessage } from "@/components/styled/ErrorMessage";
import { GreenButton } from "@/components/styled/GreenButton";
import { InputLabel } from "@/components/styled/InputLabel";
import { InputTextBackground } from "@/components/styled/InputText";
import styled from "styled-components";

export const Form = styled.form`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  gap: 1rem;
`;

export const InputWrapper = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  gap: 1rem;

  width: 100%;
`;

export const StyledInputLabel = styled(InputLabel)`
  font-size: 1.2rem;
  font-weight: 400;
`;

export const StyledInputText = styled(InputTextBackground)`
  width: 100%;

  text-align: start;
`;

export const InputDescription = styled.span`
  align-self: flex-start;

  font-size: 0.9rem;
  font-weight: 300;
`;

export const StyledErrorMessage = styled(ErrorMessage)``;

export const ControlsWrapper = styled.div`
  display: flex;
  align-self: flex-end;
  gap: 1rem;
`;

export const SubmitButton = styled(GreenButton)``;

export const CancelButton = styled(GreenButton)``;
