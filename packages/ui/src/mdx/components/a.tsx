import type { FC, ReactNode } from 'react';

// eslint-disable-next-line @typescript-eslint/consistent-type-definitions -- With an interface, we get this error in ./index: https://github.com/microsoft/TypeScript/issues/5711
type AProps = {
  children?: ReactNode;
  href?: string;
  className?: string;
};

export const A: FC<AProps> = ({ children, href, ...rest }) => {
  return (
    <a className="ui-text-blue-500" href={href} {...rest}>
      {children}
    </a>
  );
};
