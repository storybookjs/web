import { Home } from '../components/home/home';
import { getGithubCount } from '@utils';

export default async function Page() {
  const githubCount = await getGithubCount();

  return <Home githubCount={githubCount} />;
}
