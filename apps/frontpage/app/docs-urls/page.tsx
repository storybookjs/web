import { docsVersions } from '../../docs-versions';
import { generateDocsTree } from '../../lib/get-tree';

interface Props {
  params: {
    slug: string[];
  };
}

export default async function Page({ params: { slug } }: Props) {
  const result: { slug: string[] }[] = [];
  const tree = generateDocsTree();
  const treeFirstVersion = generateDocsTree(
    `content/docs/${docsVersions[0].id}`
  );

  const ids = (data: TreeProps[], removeVersion: boolean) => {
    data.forEach((item) => {
      if ('slug' in item) {
        const newSlug = item.slug.replace('/docs/', '').split('/');
        if (removeVersion) newSlug.shift();
        result.push({
          slug: newSlug,
        });
      }
      if (item.children) {
        ids(item.children, removeVersion);
      }
    });
  };

  ids(treeFirstVersion, true);
  ids(tree, false);

  return (
    <div className="p-8">
      <div className="mb-4">{result.length} pages 👻</div>
      {result.map((item, index) => (
        <div key={index}>{item.slug.join('/')}</div>
      ))}
    </div>
  );
}
