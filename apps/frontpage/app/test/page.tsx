import { getAllTrees } from '../../lib/get-all-trees';

export default function Page() {
  const tree = getAllTrees();
  console.dir(tree, { depth: 3 });
  return <div>Page</div>;
}
