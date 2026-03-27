import path from 'node:path';
import { readFile, writeFile } from 'node:fs/promises';
import { valid as isValidSemver } from 'semver';

export interface GeneratedVersion {
  version: string;
}

export interface GeneratedVersions {
  latest: GeneratedVersion;
  next: GeneratedVersion;
}

const DIST_TAGS_URL =
  'https://registry.npmjs.org/-/package/storybook/dist-tags';

export const generatedVersionsFilePath = path.join(
  process.cwd(),
  'generated-versions.json',
);

function assertDistTagVersion(
  distTag: keyof GeneratedVersions,
  version: unknown,
): GeneratedVersion {
  if (typeof version !== 'string' || !isValidSemver(version)) {
    throw new Error(
      `Expected a valid semver string for the ${distTag} dist-tag, received ${JSON.stringify(version)}`,
    );
  }

  return { version };
}

export async function fetchGeneratedVersions(): Promise<GeneratedVersions> {
  const response = await fetch(DIST_TAGS_URL, {
    headers: {
      Accept: 'application/json',
      'Cache-Control': 'no-cache',
    },
  });

  if (!response.ok) {
    throw new Error(
      `Failed to fetch Storybook dist-tags from npm: ${response.status} ${response.statusText}`,
    );
  }

  const distTags = (await response.json()) as Partial<
    Record<keyof GeneratedVersions, unknown>
  >;

  return {
    latest: assertDistTagVersion('latest', distTags.latest),
    next: assertDistTagVersion('next', distTags.next),
  };
}

export async function readGeneratedVersions(): Promise<GeneratedVersions> {
  const fileContents = await readFile(generatedVersionsFilePath, 'utf8');
  const parsed = JSON.parse(fileContents) as Partial<
    Record<keyof GeneratedVersions, { version?: unknown }>
  >;

  return {
    latest: assertDistTagVersion('latest', parsed.latest?.version),
    next: assertDistTagVersion('next', parsed.next?.version),
  };
}

export async function writeGeneratedVersions(
  versions: GeneratedVersions,
): Promise<void> {
  await writeFile(
    generatedVersionsFilePath,
    `${JSON.stringify(versions, null, 2)}\n`,
    'utf8',
  );
}
