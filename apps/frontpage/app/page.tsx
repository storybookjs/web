import { Home } from '../components/home/home';
import { getGithubCount, getNpmDownloads } from '@utils';

export default async function Page() {
  const githubCount = await getGithubCount();
  const { formattedResult } = await getNpmDownloads();

  return <Home githubCount={githubCount} npmDownloads={formattedResult} />;
}
