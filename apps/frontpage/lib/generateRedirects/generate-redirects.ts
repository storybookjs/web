import { docsVersions, latestVersion as LATEST_VERSION, historicalVersions as HISTORICAL_VERSIONS } from '@repo/utils';
import { getFrameworks } from '../get-frameworks';

const PREVIOUS_INSTALL_DOCS_PAGE_SLUG = '/docs/get-started/install/';

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

/**
 * A `to` path with a version (e.g. /docs/8/...) only works while the site
 * serves that major. Fail the build when it doesn't, so the rule gets updated.
 */
function assertHardcodedVersionIsServed(rule: Rule, supportedVersions: string[]) {
  if (!hasHardcodedVersion(rule.to)) return;
  const major = getMajor(getSuffix(rule.to).split('/')[0]);
  if (!supportedVersions.some((v) => getMajor(v) === major)) {
    throw new Error(
      `Redirect target "${rule.to}" (from "${rule.from}", under # ${rule.headerVersion}) uses version ${String(major)}, which the site no longer serves. Point it to a page that exists.`,
    );
  }
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
interface Rule {
  headerVersion: string;
  from: string;
  to: string;
  status: string;
}

/**
 * Finds the final target of `to` in the docs served for `servingVersion`.
 *
 * When a later rule moves `to` again (e.g. A to B under # 8.1, then B to C
 * under # 9.0), docs of 9.0 and up need C, but 8.x docs still have B. This
 * follows the chain only through rules that apply to `servingVersion`, so an
 * earlier rule can keep the target it had when it was written.
 */
function resolveTo(to: string, servingVersion: string, rules: Rule[]) {
  const visited = new Set<string>();
  let current = to;
  let move = findMove(current, servingVersion, rules);
  while (move) {
    if (visited.has(current)) {
      throw new Error(
        `Redirect chain loops at "${current}" (in the docs for ${servingVersion}).`,
      );
    }
    visited.add(current);
    current = move.to;
    move = findMove(current, servingVersion, rules);
  }
  return current;
}

/**
 * The latest rule that moves `path` in the docs for `servingVersion`, if any.
 * A path with a version in it is final, so it never moves.
 */
function findMove(path: string, servingVersion: string, rules: Rule[]) {
  if (hasHardcodedVersion(path)) return undefined;
  return rules
    .filter(
      (r) =>
        r.from === path &&
        compareVersions(r.headerVersion, servingVersion) <= 0,
    )
    .sort((a, b) => compareVersions(b.headerVersion, a.headerVersion))[0];
}

/** The docs version a target for `version` lands on (see getToForVersion) */
function getServingVersion(
  version: string,
  supportedVersions: string[],
  latestVersion: string,
) {
  const major = getMajor(version);
  if (major === getMajor(latestVersion)) return latestVersion;
  return supportedVersions.find((sv) => getMajor(sv) === major) ?? latestVersion;
}

function parseRawRedirects(raw: string): Rule[] {
  const lines = raw.split('\n');
  let currentVersion: string | null = null;
  const rules: Rule[] = [];

  for (const line of lines) {
    const trimmed = line.trim();
    if (!trimmed) continue;

    // eslint-disable-next-line prefer-named-capture-group -- TS version issue
    const headerMatch = /^#\s+(\d+\.\d+)\s*$/.exec(trimmed);
    if (headerMatch) {
      currentVersion = headerMatch[1].trim();
      continue;
    }

    // Skip comment lines (# lines that aren't version headers)
    if (trimmed.startsWith('#')) continue;

    if (!currentVersion) {
      throw new Error(
        `Redirect rule appears before a valid version header: "${trimmed}"`,
      );
    }

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

  return rules;
}

function generateSpecificRedirectsForRule(
  rule: Rule,
  allRules: Rule[],
  renderers: string[],
  historicalVersions: string[],
  supportedVersions: string[],
  latestVersion: string,
  nextVersion: string | null | undefined,
): string[][] {
  const { headerVersion, from: rawFrom, to: rawTo, status } = rule;
  const fromSuffix = getSuffix(rawFrom);
  const entries: string[][] = [];

  const toFor = (version: string) =>
    getToForVersion(
      resolveTo(
        rawTo,
        getServingVersion(version, supportedVersions, latestVersion),
        allRules,
      ),
      version,
      supportedVersions,
      latestVersion,
    );
  const nextTo = getNextTo(
    resolveTo(rawTo, nextVersion ?? latestVersion, allRules),
    nextVersion,
    latestVersion,
  );

  // The move isn't released yet (e.g. a 11.0 rule while 10.x is latest). The
  // old page still exists in the latest docs, so only the pre-release docs
  // get a redirect.
  if (compareVersions(headerVersion, latestVersion) > 0) {
    return [
      [
        `/docs/next/${fromSuffix}`,
        nextTo,
        '302',
      ],
    ];
  }

  // Unversioned path, which serves the latest docs
  entries.push([`/docs/${fromSuffix}`, toFor(latestVersion), status]);

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
        toFor('6.0'),
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
        toFor(v),
        status,
      ]);
    }
    // Major 7 alias after first 7.x version
    if (getMajor(v) === 7 && !added7Alias) {
      added7Alias = true;
      for (const r of renderers) {
        entries.push([
          `/docs/7/${r}/${fromSuffix}`,
          toFor('7.0'),
          status,
        ]);
      }
    }
  }

  // next with renderer (only when there are versioned entries)
  if (hasVersioned) {
    for (const r of renderers) {
      entries.push([`/docs/next/${r}/${fromSuffix}`, toFor(latestVersion), '302']);
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
      // A supported major older than the move still has the old page, and the
      // wildcard sends /docs/{v}/* there. Its docs don't have the new page.
      if (major < headerMajor && supportedMajors.has(major)) {
        seenMajors.add(major);
        continue;
      }
      entries.push([
        `/docs/${v}/${fromSuffix}`,
        toFor(v),
        status,
      ]);
      // Alias after first version of each unsupported major >= 8
      if (major >= 8 && !seenMajors.has(major) && !supportedMajors.has(major)) {
        entries.push([
          `/docs/${String(major)}/${fromSuffix}`,
          toFor(`${String(major)}.0`),
          status,
        ]);
      }
      seenMajors.add(major);
    }

    // Latest-major special case: include header version + major alias
    if (isLatestMajorCase) {
      entries.push([
        `/docs/${headerVersion}/${fromSuffix}`,
        toFor(headerVersion),
        status,
      ]);
      entries.push([
        `/docs/${String(headerMajor)}/${fromSuffix}`,
        toFor(headerVersion),
        status,
      ]);
    }

    // next without renderer
    entries.push([
      `/docs/next/${fromSuffix}`,
      nextTo,
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
    assertHardcodedVersionIsServed(rule, supportedVersions);
    result.push(
      ...generateSpecificRedirectsForRule(
        rule,
        rules,
        renderers,
        historicalVersions,
        supportedVersions,
        latestVersion,
        nextVersion,
      ),
    );
  }
  // A redirect to itself would loop
  return result.filter(([from, to]) => from !== to);
}

export function generateInstallRedirects(options: Options) {
  const { renderers, historicalVersions } = mergeOptions(options);
  const entries: string[][] = [];

  // Only pre-8 versions need explicit install redirects because their install
  // page lived at /docs/get-started/install/ instead of /docs.  For 8+ versions
  // (and /docs/next), the wildcard redirects already cover the bare-path case
  // (/* matches the empty splat).

  // --- Renderer group ---

  // Unversioned
  for (const r of renderers) {
    entries.push([`/docs/${r}`, PREVIOUS_INSTALL_DOCS_PAGE_SLUG, '301']);
  }

  // Renderer-era versions (6.4–7.4)
  const rendererEra = historicalVersions.filter(
    (v) => getEra(v) === 'renderer',
  );
  let added7Alias = false;
  for (const v of rendererEra) {
    for (const r of renderers) {
      entries.push([`/docs/${v}/${r}`, PREVIOUS_INSTALL_DOCS_PAGE_SLUG, '301']);
    }
    if (getMajor(v) === 7 && !added7Alias) {
      added7Alias = true;
      for (const r of renderers) {
        entries.push([`/docs/7/${r}`, PREVIOUS_INSTALL_DOCS_PAGE_SLUG, '301']);
      }
    }
  }

  // --- Non-renderer group ---

  const nonRenderer = historicalVersions.filter(
    (v) => getEra(v) === 'versioned',
  );
  for (const v of nonRenderer) {
    if (getMajor(v) < 8) {
      entries.push([`/docs/${v}`, PREVIOUS_INSTALL_DOCS_PAGE_SLUG, '301']);
    }
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
  let addedLatestMajorAlias = false;
  for (const v of nonRenderer) {
    const major = getMajor(v);
    if (major === latestMajor) {
      entries.push([`/docs/${v}/*`, '/docs/:splat', '302']);
      if (!addedLatestMajorAlias) {
        addedLatestMajorAlias = true;
        entries.push([`/docs/${String(latestMajor)}/*`, '/docs/:splat', '302']);
      }
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
