export interface Meta {
  path: string;
  title: string;
  shortTitle: string;
  segments: string[];
  isRoot: boolean;
  group: string | null;
  tab: string | null;
}

export interface TreeMetaProps {
  title: string;
  sidebar?: {
    title?: string;
    order?: number;
    hidden?: boolean;
  };
  tab?: {
    title?: string;
    order?: number;
  };
  isTab?: boolean;
}

export interface RawTreeProps extends TreeMetaProps {
  name: string;
  pathSegment: string;
  type: 'directory' | 'link' | 'tab';
  children?: RawTreeProps[];
  draft?: boolean;
}

export interface TreeProps extends RawTreeProps {
  slug: string;
  canonical: string;
  children?: TreeProps[];
}

export interface CodeSnippetsProps {
  filename?: string;
  option?: string;
  renderer?: string;
  packageManager?: string | null;
  language?: string;
  content?: React.ReactNode;
  raw?: string;
  tabTitle?: string;
}

export interface CodeSnippetsFilter {
  id: string;
  title: string;
}

export interface CodeSnippetsFiltersProps {
  languages: CodeSnippetsFilter[];
  packageManagers: CodeSnippetsFilter[];
}
