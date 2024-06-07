import type { ReactNode } from 'react';

import { Text } from './InputDescription.styled';

type InputDescriptionProps = { className?: string; children?: ReactNode };

const InputDescription = ({ className, children }: InputDescriptionProps) => {
  return <Text className={className}>{children}</Text>;
};

export default InputDescription;
