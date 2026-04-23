import {
  fetchGeneratedVersions,
  writeGeneratedVersions,
} from '../lib/generated-versions';

async function generate(): Promise<void> {
  const versions = await fetchGeneratedVersions();
  await writeGeneratedVersions(versions);
}

void generate();