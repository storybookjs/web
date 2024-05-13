import { redirect } from 'next/navigation';
import { getReleases } from '../../lib/get-releases';

export default function Page() {
  const releases = getReleases();

  redirect(`/releases/${releases[releases.length - 1]}`);
}
