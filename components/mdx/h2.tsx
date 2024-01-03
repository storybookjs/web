import { FC, ReactNode } from "react";

interface Props {
  children?: ReactNode;
}

export const H2: FC<Props> = ({ children }) => {
  return (
    <h2 className="text-2xl mt-0 mb-6 font-bold [&>a]:text-black">
      {children}
    </h2>
  );
};
