import { FC, ReactNode } from "react";

interface Props {
  children?: ReactNode;
}

export const Hr: FC<Props> = () => {
  return <hr className="my-10" />;
};
