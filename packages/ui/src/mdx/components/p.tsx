import type { FC, ReactNode } from 'react';

// eslint-disable-next-line @typescript-eslint/consistent-type-definitions -- With an interface, we get this error in ./index: https://github.com/microsoft/TypeScript/issues/5711
type PProps = {
  children?: ReactNode;
};

export const P: FC<PProps> = ({ children }) => {
  return (
    <p className="text-md ui-mb-6 ui-mt-0 ui-leading-7 [&>a]:ui-text-blue-500">
      {children}
    </p>
  );
};
