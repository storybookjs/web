import type { FC, ReactNode } from 'react';

interface PProps {
  children?: ReactNode;
}

export const P: FC<PProps> = ({ children }) => {
  return (
    <p className="text-md leading-7 mb-4 mt-0 [&>a]:text-blue-700">
      {children}
    </p>
  );
};
