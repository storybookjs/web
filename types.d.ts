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

type PageProps = {
  id: string;
  path: string;
  slug: string;
  title: string;
  shortTitle: string;
  parent: string | null;
  tabs: string[];
  isTab: boolean;
  order: number;
  content: ReactElement<any, string | JSXElementConstructor<any>>;
  children?: PageProps[];
};

type PageMetaProps = Omit<PageProps, "content">;

interface TreeProps extends PageMetaProps {
  children?: TreeProps[];
}
