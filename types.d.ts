type Meta = {
  id: string;
  title: string;
  sidebarTitle: string;
  href: string;
};

type PageProps = {
  meta: Meta;
  content: ReactElement<any, string | JSXElementConstructor<any>>;
};
