import { getReleases } from '../../lib/get-releases';
import { redirect } from 'next/navigation';

export default function Page() {
  const releases = getReleases();

  redirect(`/releases/${releases[releases.length - 1]}`);
}
