type Meta = {
  id: string;
  title: string;
  sidebarTitle: string;
  href: string;
  paths: string[];
};

type PageProps = {
  meta: Meta;
  content: ReactElement<any, string | JSXElementConstructor<any>>;
};

interface TreeNodeProps extends Meta {
  name: string;
  children: TreeNodeProps[];
}
