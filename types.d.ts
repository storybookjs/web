type Meta = {
  id: string;
  title: string;
  sidebarTitle: string;
  href: string;
  segments: string[];
};

type PageProps = {
  meta: Meta;
  content: ReactElement<any, string | JSXElementConstructor<any>>;
};

interface TreeNodeProps extends Meta {
  segment: string;
  children: TreeNodeProps[];
}
