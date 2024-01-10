"use client";

import { getMDXComponent } from "mdx-bundler/client";
import { FC, useMemo, useState } from "react";

interface CodeSnippetsClientProps {
  data: CodeSnippetsProps[];
}

export const CodeSnippetsClient: FC<CodeSnippetsClientProps> = ({ data }) => {
  const [selected, setSelected] = useState<CodeSnippetsProps>(data[0]);

  const Code = useMemo(() => getMDXComponent(selected.code), [selected.code]);

  return <Code />;
};
