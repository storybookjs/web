interface HeaderProps {
  variant?: "home" | "system";
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
  path: string;
  code: string;
  renderer: string | null;
  packageManager: string | null;
  language: string | null;
}
