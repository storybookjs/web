import type { FC, ReactNode } from 'react';

interface PProps {
  children?: ReactNode;
}

export const P: FC<PProps> = ({ children }) => {
  return (
    <p className="text-md mb-6 mt-0 leading-7 [&>a]:text-blue-500">
      {children}
    </p>
  );
};
