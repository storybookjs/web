import { FC, ReactNode } from "react";
import { CodeWrapper } from "./code-snippets/wrapper";

interface PreProps {
  children?: ReactNode;
}

export const Pre: FC<PreProps> = ({ children }) => {
  return (
    <CodeWrapper>
      <pre>{children}</pre>
    </CodeWrapper>
  );
};
