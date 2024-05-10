import type { FC, ReactNode } from "react";

interface Props {
  children?: ReactNode;
}

export const UnorderedList: FC<Props> = ({ children }) => {
  return <ul className="list-disc list-inside mb-6">{children}</ul>;
};

export const List: FC<Props> = ({ children }) => {
  return <li className="text-md mb-2 pl-4">{children}</li>;
};
