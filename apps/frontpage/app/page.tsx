import { Home } from '../components/home/home';
import { getGithubCount, getNpmDownloads } from '@utils';

export default async function Page() {
  const githubCount = await getGithubCount();
  const npmDownloads = await getNpmDownloads();

  console.log(npmDownloads);

  return <Home githubCount={githubCount} npmDownloads={npmDownloads} />;
}
