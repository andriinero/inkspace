import type { ComponentPropsWithoutRef } from 'react';

import { StyledInputText } from './ProfileInput.styled';

type ProfileInputProps = {
  className?: string;
} & ComponentPropsWithoutRef<'input'>;

const ProfileInput = ({ className, ...otherProps }: ProfileInputProps) => {
  return <StyledInputText {...otherProps} className={className} />;
};

export default ProfileInput;
