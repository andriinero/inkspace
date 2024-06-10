import type { ComponentPropsWithoutRef } from 'react';

import { StyledTextButton, Input } from './InputFile.styled';

type InputFileProps = ComponentPropsWithoutRef<'input'>;

const InputFile = ({
  id = 'file-input',
  className,
  children = 'Upload',
  ...otherProps
}: InputFileProps) => {
  const handleRedirectButtonClick = (): void => {
    if (id) document.getElementById(id)?.click();
  };

  return (
    <>
      <StyledTextButton
        onClick={handleRedirectButtonClick}
        type="button"
        className={className}
      >
        {children}
      </StyledTextButton>
      <Input id={id} type="file" {...otherProps} />
    </>
  );
};

export default InputFile;
