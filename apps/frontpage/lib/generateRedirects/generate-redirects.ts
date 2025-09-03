import { docsVersions, latestVersion } from '@repo/utils';
import { buildPathWithVersion } from '../build-path-with-version';
import { getFrameworks } from '../get-frameworks';

// We need to fill out the minor versions that aren't represented in the versions we import
export function generateSequence(inputVersions: string[]) {
  const result = new Set<string>();

  for (const version of inputVersions) {
    result.add(version);

    const [major, maxMinor] = version.split('.');

    for (let minor = Number(maxMinor) - 1; minor >= 0; minor--) {
      // eslint-disable-next-line @typescript-eslint/restrict-template-expressions -- TODO: Fix this
      result.add(`${major}.${minor}`);
    }
  }

  return [...result];
}

const allMinorDocsVersions = generateSequence(docsVersions.map((v) => v.id));

type Lines = [string, string, string][];

export function parseRawRedirects(rawRedirects: string) {
  const lines = rawRedirects.split('\n');
  const parsed: Lines = [];

  lines.forEach((line) => {
    if (!line.startsWith('#') && line.trim() !== '') {
      // Add non-empty lines to the current version's lines array
      parsed.push(line.split(/\s+/) as Lines[0]);
    }
  });

  return parsed;
}

interface Version {
  string: string;
  label?: string;
  version?: number;
}

interface Redirect {
  source: string;
  destination: string;
  permanent: boolean;
}

function getAllRenderers() {
  const { coreFrameworks, communityFrameworks } = getFrameworks();
  return [...coreFrameworks, ...communityFrameworks];
}

function shouldShortenToMajor(version: string, nextVersion?: string | null) {
  return version !== nextVersion || nextVersion.split('.')[1] === '0';
}

function getShortedVersionString(version: string, nextVersion?: string | null) {
  return shouldShortenToMajor(version, nextVersion)
    ? version.split('.')[0]
    : version;
}

function getRedirect(
  source: string,
  destination: string,
  code: string,
  // eslint-disable-next-line no-unused-vars, @typescript-eslint/no-unused-vars -- TODO: Fix this
  debugType?: string,
) {
  return {
    source,
    destination,
    permanent: code === '308',
    // debugType,
  };
}

function fromWithRenderer(from: string, renderer: string) {
  const parts = from.split('/');
  parts.splice(2, 0, renderer);
  return parts.join('/');
}

const installDocsPageSlug = (string: string) =>
  string === 'next' || Number(string) >= 8
    ? '/docs'
    : '/docs/get-started/install/';

export function generateRedirects({
  latestVersionString = latestVersion.id,
  nextVersionString = docsVersions.find((v) => v.preRelease)?.id,
  rawRedirects,
  renderers: renderersIn,
  versions = [
    ...allMinorDocsVersions.map((v) => ({ string: v, version: Number(v) })),
    { string: 'next' },
  ],
}: {
  latestVersionString?: string;
  nextVersionString?: string | null;
  rawRedirects: string;
  renderers?: string[];
  versions?: Version[];
}) {
  const renderers = renderersIn ?? getAllRenderers();
  const renderersPathWildcardWithRegex = `:renderer(${renderers.join('|')})`;

  const parsedRedirects = parseRawRedirects(rawRedirects);

  const result = versions
    .reduce<Redirect[]>(
      (acc, { string, version = Number(latestVersionString) }) => {
        const isNext = string === 'next';
        const includeRenderers = version < 7.6;
        const isLatest = string === latestVersionString;
        const versionSlug = isLatest ? '' : `/${string}`;
        const versionStringNormalized = isNext
          ? nextVersionString ?? latestVersionString
          : string;
        const versionStringOverride = isLatest
          ? ''
          : getShortedVersionString(versionStringNormalized, nextVersionString);
        const versionSlugOverride = isLatest ? '' : `/${versionStringOverride}`;

        const [stringMajor, stringMinor] = string.split('.');
        const isMajorOfLatestMinor =
          stringMinor === '0' &&
          stringMajor === latestVersionString.split('.')[0];

        if (isLatest) {
          parsedRedirects.forEach(([from, to, code]) => {
            acc.push(getRedirect(from, to, code, 'a'));
            acc.push(
              getRedirect(
                fromWithRenderer(from, renderersPathWildcardWithRegex),
                to,
                code,
                'b',
              ),
            );
          });
          acc.push(
            getRedirect(
              `/docs/${string}/:path*`,
              `/docs/:path*`,
              '308',
              'b',
            )
          );
          if (string.includes('.0')) {
            acc.push(
              getRedirect(
                `/docs/${string.replace('.0', '')}/:path*`,
                `/docs/:path*`,
                '308',
                'b',
              )
            );
          }
        } else {
          // acc.push({
          //   debug: {
          //     includeRenderers,
          //     string,
          //     versionStringNormalized,
          //     versionSlugOverride,
          //     isLatest,
          //     isNext,
          //     isMajorOfLatestMinor,
          //     shouldShortenToMajor: shouldShortenToMajor(
          //       versionStringNormalized,
          //       nextVersionString,
          //     ),
          //   },
          // });
          // eslint-disable-next-line no-lonely-if -- TODO: Fix this
          if (versionSlug !== `/${versionStringOverride}`) {
            acc.push(
              getRedirect(
                `/docs${versionSlug}`,
                isMajorOfLatestMinor || (isNext && !nextVersionString)
                  ? installDocsPageSlug(string)
                  : buildPathWithVersion(
                      installDocsPageSlug(string),
                      versionStringOverride,
                    ),
                isNext ? '307' : '308',
                'c',
              ),
            );
          }
        }

        if (includeRenderers || isLatest || isNext) {
          if (isLatest) {
            acc.push(
              getRedirect(
                `/docs/${renderersPathWildcardWithRegex}/:path*`,
                '/docs/:path*',
                '308',
                'd',
              ),
            );
          } else {
            acc.push(
              getRedirect(
                `/docs/${string}/${renderersPathWildcardWithRegex}/:path*`,
                isMajorOfLatestMinor || (isNext && !nextVersionString)
                  ? `/docs/:path*`
                  : `/docs${versionSlugOverride}/:path*`,
                isNext ? '307' : '308',
                'e',
              ),
            );
          }
        }

        if (
          !includeRenderers &&
          (isLatest ||
            isNext ||
            shouldShortenToMajor(versionStringNormalized, nextVersionString))
        ) {
          acc.push(
            getRedirect(
              `/docs/${string}/:path*`,
              isMajorOfLatestMinor || (isNext && !nextVersionString)
                ? `/docs/:path*`
                : `/docs${versionSlugOverride}/:path*`,
              isLatest || isNext ? '307' : '308',
              'f',
            ),
          );
        }

        return acc;
      },
      [],
    )
    .concat([
      {
        source: '/releases',
        destination: `/releases/${latestVersionString}`,
        permanent: false,
      },
    ]);

  // eslint-disable-next-line no-console -- OK
  console.log(`Generated ${result.length.toString()} redirects`);
  if (result.length > 900) {
    throw new Error(`
That's too many redirects.

Next.js only allows 1024 redirects in Next.config:
https://nextjs.org/docs/app/building-your-application/routing/redirecting#redirects-in-nextconfigjs

At-scale approach:
https://nextjs.org/docs/app/building-your-application/routing/redirecting#managing-redirects-at-scale-advanced
  `);
  }

  return result;
}
