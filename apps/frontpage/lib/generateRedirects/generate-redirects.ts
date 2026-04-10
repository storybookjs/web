import { docsVersions, latestVersion as LATEST_VERSION, historicalVersions as HISTORICAL_VERSIONS } from '@repo/utils';
import { getFrameworks } from '../get-frameworks';

function getAllRenderers() {
  const { coreFrameworks, communityFrameworks } = getFrameworks();
  return [...coreFrameworks, ...communityFrameworks];
}

const defaultOptions = {
  rawRedirects: '',
  renderers: getAllRenderers(),
  supportedVersions: docsVersions.map((v) => v.id),
  historicalVersions: HISTORICAL_VERSIONS,
  latestVersion: LATEST_VERSION.id,
  nextVersion: docsVersions.find((v) => v.preRelease)?.id,
};

function parseVersion(v: string) {
  const [major, minor] = v.split('.').map(Number);
  return { major, minor };
}

function compareVersions(a: string, b: string) {
  const pa = parseVersion(a);
  const pb = parseVersion(b);
  return pa.major !== pb.major ? pa.major - pb.major : pa.minor - pb.minor;
}

function getMajor(v: string) {
  return parseVersion(v).major;
}

function getEra(v: string): 'unversioned' | 'renderer' | 'versioned' {
  const { major, minor } = parseVersion(v);
  if (major < 6 || (major === 6 && minor < 4)) return 'unversioned';
  if (major < 7 || (major === 7 && minor <= 4)) return 'renderer';
  return 'versioned';
}

function hasHardcodedVersion(toPath: string) {
  return /^\/docs\/\d+(?:\.\d+)?\//.test(toPath);
}

function getSuffix(path: string) {
  return path.replace(/^\/docs\//, '');
}

function getToForVersion(
  rawTo: string,
  version: string,
  supportedVersions: string[],
  latestVersion: string,
) {
  if (hasHardcodedVersion(rawTo)) return rawTo;
  const major = getMajor(version);
  if (major === getMajor(latestVersion)) return rawTo;
  if (supportedVersions.some((sv) => getMajor(sv) === major)) {
    return `/docs/${String(major)}/${getSuffix(rawTo)}`;
  }
  return rawTo;
}

function getNextTo(
  rawTo: string,
  nextVersion: string | null | undefined,
  latestVersion: string,
) {
  if (hasHardcodedVersion(rawTo)) return rawTo;
  if (!nextVersion) return rawTo;
  const suffix = getSuffix(rawTo);
  const nextMajor = getMajor(nextVersion);
  return nextMajor > getMajor(latestVersion)
    ? `/docs/${String(nextMajor)}/${suffix}`
    : `/docs/${nextVersion}/${suffix}`;
}

const installDocsPageSlug = (version: string) =>
  version === 'next' || Number(version) >= 8
    ? '/docs'
    : '/docs/get-started/install/';

interface Rule {
  headerVersion: string;
  from: string;
  to: string;
  status: string;
}

function parseRawRedirects(raw: string): Rule[] {
  const lines = raw.split('\n');
  let currentVersion: string | null = null;
  const rules: Rule[] = [];

  for (const line of lines) {
    const trimmed = line.trim();
    if (!trimmed) continue;

    // eslint-disable-next-line prefer-named-capture-group -- TS version issue
    const headerMatch = /^#\s+(.+)$/.exec(trimmed);
    if (headerMatch) {
      currentVersion = headerMatch[1].trim();
      continue;
    }

    if (currentVersion) {
      const parts = trimmed.split(/\s+/).filter(Boolean);
      if (parts.length >= 3) {
        rules.push({
          headerVersion: currentVersion,
          from: parts[0],
          to: parts[1],
          status: parts[2],
        });
      }
    }
  }

  return rules;
}

function generateSpecificRedirectsForRule(
  rule: Rule,
  renderers: string[],
  historicalVersions: string[],
  supportedVersions: string[],
  latestVersion: string,
  nextVersion: string | null | undefined,
): string[][] {
  const { headerVersion, from: rawFrom, to: rawTo, status } = rule;
  const fromSuffix = getSuffix(rawFrom);
  const entries: string[][] = [];

  const beforeHeader = historicalVersions.filter(
    (v) => compareVersions(v, headerVersion) < 0,
  );

  const headerMajor = getMajor(headerVersion);
  const latestMajor = getMajor(latestVersion);
  const isLatestMajorCase =
    headerMajor === latestMajor &&
    compareVersions(headerVersion, latestVersion) <= 0;

  const hasVersioned = beforeHeader.some((v) => getEra(v) !== 'unversioned');

  // --- Renderer group ---

  // Unversioned entries (deduplicated — all produce the same from-path)
  if (beforeHeader.some((v) => getEra(v) === 'unversioned')) {
    for (const r of renderers) {
      entries.push([
        `/docs/${r}/${fromSuffix}`,
        getToForVersion(rawTo, '6.0', supportedVersions, latestVersion),
        status,
      ]);
    }
  }

  // Versioned + renderer entries (6.4–7.4)
  const rendererEra = beforeHeader.filter((v) => getEra(v) === 'renderer');
  let added7Alias = false;
  for (const v of rendererEra) {
    for (const r of renderers) {
      entries.push([
        `/docs/${v}/${r}/${fromSuffix}`,
        getToForVersion(rawTo, v, supportedVersions, latestVersion),
        status,
      ]);
    }
    // Major 7 alias after first 7.x version
    if (getMajor(v) === 7 && !added7Alias) {
      added7Alias = true;
      for (const r of renderers) {
        entries.push([
          `/docs/7/${r}/${fromSuffix}`,
          getToForVersion(rawTo, '7.0', supportedVersions, latestVersion),
          status,
        ]);
      }
    }
  }

  // next with renderer (only when there are versioned entries)
  if (hasVersioned) {
    for (const r of renderers) {
      entries.push([`/docs/next/${r}/${fromSuffix}`, rawTo, '302']);
    }
  }

  // --- Non-renderer group ---

  const nonRenderer = beforeHeader.filter((v) => getEra(v) === 'versioned');
  const hasNonRendererGroup = nonRenderer.length > 0 || isLatestMajorCase;

  if (hasNonRendererGroup) {
    const supportedMajors = new Set(
      supportedVersions.map((v) => getMajor(v)),
    );
    const seenMajors = new Set<number>();

    for (const v of nonRenderer) {
      const major = getMajor(v);
      entries.push([
        `/docs/${v}/${fromSuffix}`,
        getToForVersion(rawTo, v, supportedVersions, latestVersion),
        status,
      ]);
      // Alias after first version of each unsupported major >= 8
      if (major >= 8 && !seenMajors.has(major) && !supportedMajors.has(major)) {
        entries.push([
          `/docs/${String(major)}/${fromSuffix}`,
          getToForVersion(
            rawTo,
            `${String(major)}.0`,
            supportedVersions,
            latestVersion,
          ),
          status,
        ]);
      }
      seenMajors.add(major);
    }

    // Latest-major special case: include header version + major alias
    if (isLatestMajorCase) {
      entries.push([
        `/docs/${headerVersion}/${fromSuffix}`,
        getToForVersion(
          rawTo,
          headerVersion,
          supportedVersions,
          latestVersion,
        ),
        status,
      ]);
      entries.push([
        `/docs/${String(headerMajor)}/${fromSuffix}`,
        getToForVersion(
          rawTo,
          headerVersion,
          supportedVersions,
          latestVersion,
        ),
        status,
      ]);
    }

    // next without renderer
    entries.push([
      `/docs/next/${fromSuffix}`,
      getNextTo(rawTo, nextVersion, latestVersion),
      '302',
    ]);
  }

  return entries;
}

interface Options {
  rawRedirects: string;
  renderers?: string[];
  supportedVersions?: string[];
  historicalVersions?: string[];
  latestVersion?: string;
  nextVersion?: string | null;
}

function mergeOptions(options: Options) {
  return { ...defaultOptions, ...options };
}

export function generateSpecificPathRedirects(options: Options) {
  const { rawRedirects, renderers, historicalVersions, supportedVersions, latestVersion, nextVersion } = mergeOptions(options);

  const result: string[][] = [];
  const rules = parseRawRedirects(rawRedirects);
  for (const rule of rules) {
    result.push(
      ...generateSpecificRedirectsForRule(
        rule,
        renderers,
        historicalVersions,
        supportedVersions,
        latestVersion,
        nextVersion,
      ),
    );
  }
  return result;
}

export function generateInstallRedirects(options: Options) {
  const { renderers, historicalVersions, supportedVersions, latestVersion, nextVersion } = mergeOptions(options);
  const entries: string[][] = [];
  const latestMajor = getMajor(latestVersion);
  const isMajorPreRelease = nextVersion && getMajor(nextVersion) > latestMajor;

  // When a major pre-release exists, the oldest supported major drops off
  // and the current latest major becomes supported non-latest.
  const allSupportedMajors = new Set(supportedVersions.map((v) => getMajor(v)));
  let effectiveSupportedMajors: Set<number>;
  if (isMajorPreRelease) {
    const minMajor = Math.min(...allSupportedMajors);
    effectiveSupportedMajors = new Set([...allSupportedMajors].filter((m) => m !== minMajor));
  } else {
    effectiveSupportedMajors = new Set([...allSupportedMajors].filter((m) => m !== latestMajor));
  }

  // --- Renderer group ---

  // Unversioned
  for (const r of renderers) {
    entries.push([`/docs/${r}`, installDocsPageSlug('6.0'), '301']);
  }

  // Renderer-era versions (6.4–7.4)
  const rendererEra = historicalVersions.filter(
    (v) => getEra(v) === 'renderer',
  );
  let added7Alias = false;
  for (const v of rendererEra) {
    for (const r of renderers) {
      entries.push([`/docs/${v}/${r}`, installDocsPageSlug(v), '301']);
    }
    if (getMajor(v) === 7 && !added7Alias) {
      added7Alias = true;
      for (const r of renderers) {
        entries.push([`/docs/7/${r}`, installDocsPageSlug('7'), '301']);
      }
    }
  }

  // next with renderer
  for (const r of renderers) {
    entries.push([`/docs/next/${r}`, installDocsPageSlug('next'), '302']);
  }

  // --- Non-renderer group ---

  const nonRenderer = historicalVersions.filter(
    (v) => getEra(v) === 'versioned',
  );
  for (const v of nonRenderer) {
    const major = getMajor(v);
    if (!isMajorPreRelease && major === latestMajor) {
      entries.push([`/docs/${v}`, '/docs', '302']);
    } else if (effectiveSupportedMajors.has(major)) {
      entries.push([`/docs/${v}`, `/docs/${String(major)}`, '301']);
    } else {
      entries.push([`/docs/${v}`, installDocsPageSlug(v), '301']);
    }
  }

  // Major pre-release entry
  if (isMajorPreRelease) {
    const nextMajor = getMajor(nextVersion);
    entries.push([`/docs/${nextVersion}`, `/docs/${String(nextMajor)}`, '302']);
  }

  // next without renderer (only when no major pre-release)
  if (!isMajorPreRelease) {
    entries.push([`/docs/next`, installDocsPageSlug('next'), '302']);
  }

  return entries;
}

export function generateWildcardRedirects(options: Options) {
  const { renderers, historicalVersions, supportedVersions, latestVersion, nextVersion } = mergeOptions(options);
  const entries: string[][] = [];
  const latestMajor = getMajor(latestVersion);
  const supportedMajors = new Set(supportedVersions.map((v) => getMajor(v)));

  // --- Renderer group ---

  // Unversioned
  for (const r of renderers) {
    entries.push([`/docs/${r}/*`, '/docs/:splat', '301']);
  }

  // Renderer-era versions (6.4–7.4)
  const rendererEra = historicalVersions.filter(
    (v) => getEra(v) === 'renderer',
  );
  let added7Alias = false;
  for (const v of rendererEra) {
    for (const r of renderers) {
      entries.push([`/docs/${v}/${r}/*`, '/docs/:splat', '301']);
    }
    if (getMajor(v) === 7 && !added7Alias) {
      added7Alias = true;
      for (const r of renderers) {
        entries.push([`/docs/7/${r}/*`, '/docs/:splat', '301']);
      }
    }
  }

  // next with renderer
  for (const r of renderers) {
    entries.push([`/docs/next/${r}/*`, '/docs/:splat', '302']);
  }

  // --- Non-renderer group ---

  const nonRenderer = historicalVersions.filter(
    (v) => getEra(v) === 'versioned',
  );
  for (const v of nonRenderer) {
    const major = getMajor(v);
    if (major === latestMajor) {
      entries.push([`/docs/${v}/*`, '/docs/:splat', '302']);
    } else if (supportedMajors.has(major)) {
      entries.push([`/docs/${v}/*`, `/docs/${String(major)}/:splat`, '301']);
    } else {
      entries.push([`/docs/${v}/*`, '/docs/:splat', '301']);
    }
  }

  // Major pre-release entry
  if (nextVersion && getMajor(nextVersion) > latestMajor) {
    const nextMajor = getMajor(nextVersion);
    entries.push([
      `/docs/${nextVersion}/*`,
      `/docs/${String(nextMajor)}/:splat`,
      '302',
    ]);
  }

  // next without renderer
  let nextTo = '/docs/:splat';
  if (nextVersion) {
    const nextMajor = getMajor(nextVersion);
    nextTo =
      nextMajor > latestMajor
        ? `/docs/${String(nextMajor)}/:splat`
        : `/docs/${nextVersion}/:splat`;
  }
  entries.push([`/docs/next/*`, nextTo, '302']);

  return entries;
}

export function generateRedirects(options: Options) {
  return [
    ...generateSpecificPathRedirects(options),
    ...generateInstallRedirects(options),
    ...generateWildcardRedirects(options),
  ];
}
