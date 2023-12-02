type Meta = {
  id: string;
  title: string;
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
  currentSegment: string;
  id: string;
  children: TemporaryTreeNodeProps[];
}

interface TreeNodeProps extends Meta {
  currentSegment: string;
  children: TreeNodeProps[];
}
