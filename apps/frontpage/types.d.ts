interface HeaderProps {
  variant?: "home" | "system";
  tree?: TreeProps[];
  activeVersion?: {
    label: string;
    id: string;
    branch?: string;
    tag?: string;
    commit?: string;
  };
}

type Meta = {
  path: string;
  title: string;
  shortTitle: string;
  segments: string[];
  isRoot: boolean;
  group: string | null;
  tab: string | null;
};

interface TreeMetaProps {
  title: string;
  sidebar?: {
    title?: string;
    order?: number;
  };
  tab?: {
    title?: string;
    order?: number;
  };
  isTab?: boolean;
}

interface TreeProps extends TreeMetaProps {
  name: string;
  slug: string;
  pathSegment: string;
  type: "directory" | "link" | "tab";
  children?: TreeProps[];
}

interface CodeSnippetsProps {
  filename?: string;
  option?: string;
  renderer?;
  packageManager?: string | null;
  language?: string;
  content: ReactNode;
}

type CodeSnippetsFilter = { id: string; title: string } | undefined;

interface CodeSnippetsFiltersProps {
  languages: CodeSnippetsFilter[];
  packageManagers: CodeSnippetsFilter[];
}
