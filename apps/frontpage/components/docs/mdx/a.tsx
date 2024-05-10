import type { FC, ReactNode } from "react";

interface Props {
  children?: ReactNode;
}

export const A: FC<Props> = ({ children, ...rest }) => {
  return (
    <a className="text-blue-700" {...rest}>
      {children}
    </a>
  );
};
