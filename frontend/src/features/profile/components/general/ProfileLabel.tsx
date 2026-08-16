import type { ComponentPropsWithoutRef, ReactNode } from 'react';
import { Label } from './ProfileLabel.styled';

type ProfileLabelProps = {
  className?: string;
  children?: ReactNode;
} & ComponentPropsWithoutRef<'label'>;

const ProfileLabel = ({ className, children }: ProfileLabelProps) => {
  return <Label className={className}>{children}</Label>;
};

export default ProfileLabel;
