import { Home } from '../components/home/home';
import { githubCount } from '../lib/get-github-count';

export default async function Page() {
  const count = await githubCount();

  return <Home githubCount={count} />;
}
