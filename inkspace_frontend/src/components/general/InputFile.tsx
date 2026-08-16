import { forwardRef, useEffect, useState } from 'react';

import type { ComponentPropsWithRef, ForwardedRef } from 'react';

import { BsCheck } from 'react-icons/bs';
import { Input, StyledAppIcon, StyledTextButton } from './InputFile.styled';

type InputFileProps = ComponentPropsWithRef<'input'>;

const InputFile = forwardRef(
  (
    {
      id = 'image-upload',
      className,
      children = 'Upload',
      ...otherProps
    }: InputFileProps,
    ref: ForwardedRef<HTMLInputElement>,
  ) => {
    const [hasFiles, setHasFiles] = useState<boolean>(false);

    useEffect(() => {
      const fileInput = document.getElementById(id) as HTMLInputElement;
      const checkInput = (): void => {
        if (fileInput.files && fileInput.files.length > 0) setHasFiles(true);
      };
      fileInput.addEventListener('change', checkInput);

      return () => {
        fileInput.removeEventListener('change', checkInput);
      };
    }, [id]);

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
          {hasFiles && (
            <StyledAppIcon>
              <BsCheck size="1.25rem" />
            </StyledAppIcon>
          )}
        </StyledTextButton>
        <Input ref={ref} id={id} type="file" {...otherProps} />
      </>
    );
  },
);

export default InputFile;
