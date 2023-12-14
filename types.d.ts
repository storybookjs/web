interface HeaderProps {
  variant?: "home" | "system";
}

type Meta = {
  path: string;
  title: string;
  name: string;
  shortTitle: string;
  slug: string;
  showAsTabs: boolean;
  segments: string[];
};

type PageProps = {
  meta: Meta;
  content: ReactElement<any, string | JSXElementConstructor<any>>;
};

interface TemporaryTreeNodeProps {
  path: string;
  name: string;
  children: TemporaryTreeNodeProps[];
}

interface TreeNodeProps extends Meta {
  name: string;
  children: TreeNodeProps[];
}
