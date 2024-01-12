import { FC, ReactNode } from "react";

interface Props {
  children?: ReactNode;
}

export const H1: FC<Props> = ({ children }) => {
  return <h1 className="text-4xl mt-0 mb-6 font-bold">{children}</h1>;
};
