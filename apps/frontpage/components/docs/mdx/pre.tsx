import type { FC, ReactNode } from "react";
import { CodeWrapper } from "./code-snippets/wrapper";

interface PreProps {
  children?: ReactNode;
}

export const Pre: FC<PreProps> = ({ children, ...props }) => {
  return (
    <CodeWrapper>
      <pre>{children}</pre>
    </CodeWrapper>
  );
};
