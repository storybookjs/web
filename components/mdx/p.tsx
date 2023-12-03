import { FC, ReactNode } from "react";

interface Props {
  children?: ReactNode;
}

export const P: FC<Props> = ({ children }) => {
  return <p className="text-md leading-7 mb-4 mt-0">{children}</p>;
};
