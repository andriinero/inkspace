import { forwardRef } from 'react';
import { RegisterOptions, UseFormRegisterReturn } from 'react-hook-form';

import { Input } from './InputFile.styled';

type InputFileProps = {
  register?: (name: string, options?: RegisterOptions) => UseFormRegisterReturn;
  id?: string;
  className?: string;
};

const InputFile = forwardRef(({ register, id, className }: InputFileProps, _) => {
  return <Input {...register} className={className} id={id} type="file" />;
});

export default InputFile;
