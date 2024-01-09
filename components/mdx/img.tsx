import { FC, ReactNode } from "react";

interface Props {
  children?: ReactNode;
}

export const Img: FC<Props> = ({ children, ...rest }) => {
  return (
    <a className="text-blue-700" {...rest}>
      {children}
    </a>
  );
};
