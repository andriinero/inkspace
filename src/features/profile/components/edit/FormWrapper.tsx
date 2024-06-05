import { ReactNode } from "react";
import { Wrapper } from "./FormWrapper.styled";

type FormWrapperProps = {
  className?: string;
  children?: ReactNode;
};

const FormWrapper = ({ children }: FormWrapperProps) => {
  return <Wrapper>{children}</Wrapper>;
};

export default FormWrapper;
