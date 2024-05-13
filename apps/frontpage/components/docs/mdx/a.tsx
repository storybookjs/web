import type { FC, ReactNode } from 'react';

interface AProps {
  children?: ReactNode;
}

export const A: FC<AProps> = ({ children, ...rest }) => {
  return (
    <a className="text-blue-700" {...rest}>
      {children}
    </a>
  );
};
