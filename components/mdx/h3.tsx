import { FC, ReactNode } from "react";

interface Props {
  children?: ReactNode;
}

export const H3: FC<Props> = ({ children }) => {
  return <h3 className="text-xl mt-10 mb-4 font-bold">{children}</h3>;
};
