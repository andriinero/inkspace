import { forwardRef } from 'react';

import type { ComponentPropsWithRef, ForwardedRef } from 'react';

import { Input, StyledTextButton } from './InputFile.styled';

type InputFileProps = ComponentPropsWithRef<'input'>;

const InputFile = forwardRef(
  (
    { id, className, children = 'Upload', ...otherProps }: InputFileProps,
    ref: ForwardedRef<HTMLInputElement>,
  ) => {
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
        <Input ref={ref} id={id} type="file" {...otherProps} />
      </>
    );
  },
);

export default InputFile;
