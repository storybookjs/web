import { FC, ReactNode } from "react";

interface Props {
  children?: ReactNode;
}

export const Details: FC<Props> = ({ children }) => {
  return <details className="my-10">{children}</details>;
};
