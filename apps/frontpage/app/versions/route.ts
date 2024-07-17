import crypto from 'node:crypto';
import { readFile } from 'node:fs/promises';
import path from 'node:path';
import { headers } from 'next/headers';
import type { NextRequest } from 'next/server';
import { BigQuery } from '@google-cloud/bigquery';
import { parse as semverParse } from 'semver';
import { latestVersion } from '@repo/utils';

// eslint-disable-next-line no-useless-escape, prefer-named-capture-group -- Escape is absolutely necessary for regex?
const SEP_REGEX = /([\.:])/;

// const logger = console;
const logger = { log: (..._msgs: unknown[]) => {} };

const { GCP_CREDENTIALS, SKIP_IP_HASH } = process.env;

const versionFilesDir = path.join(
  process.cwd(),
  'content/docs',
  latestVersion.id,
  'versions',
);

const md5 = (host: string) => {
  const hash = crypto.createHash('md5');
  hash.update(host);
  return hash.digest('hex');
};

const truncate = (host: string) => {
  const match = SEP_REGEX.exec(host);
  const sep = match ? match[0] : '.';
  const prefix = host.slice(0, host.lastIndexOf(sep));
  return `${prefix}${sep}0`;
};

const splitVersion = (version: string) => {
  const parsed = semverParse(version);
  if (!parsed) return {};

  let shortVersion = `${parsed.major.toString()}.${parsed.minor.toString()}`;
  if (parsed.prerelease.length > 0) {
    shortVersion = `${shortVersion}-${parsed.prerelease[0].toString()}`;
  }

  return {
    shortVersion,
    versionMajor: parsed.major,
    versionMinor: parsed.minor,
    versionPatch: parsed.patch,
    versionPrerelease:
      parsed.prerelease.length > 0 ? parsed.prerelease.join('.') : undefined,
  };
};

const log = async (searchParams: URLSearchParams) => {
  if (!GCP_CREDENTIALS) {
    logger.log('no gcp credentials, skipping');
    return;
  }

  const headersList = headers();

  logger.log('logging event');

  const gcpCredentials = JSON.parse(GCP_CREDENTIALS) as { project_id: string };
  const bigquery = new BigQuery({
    projectId: gcpCredentials.project_id,
    credentials: gcpCredentials,
  });
  const dataset = bigquery.dataset('log');
  const table = dataset.table('requests');

  const { current: version } =
    (searchParams as unknown as { current: string }) || {};

  // x-forwarded-for can contain a list of comma-separated proxies
  // @ts-expect-error - One will always exist
  let remotehost = (
    headersList.get('x-forwarded-for') ?? headersList.get('host')
  ).split(',')[0];
  const truncatedHost = truncate(remotehost);
  logger.log({ SKIP_IP_HASH });
  if (SKIP_IP_HASH !== 'true') {
    remotehost = md5(remotehost);
  }
  const userAgent = headersList.get('user-agent');

  const row = {
    timestamp: new Date().toISOString(),
    remotehost,
    truncatedHost,
    version,
    userAgent,
    ...splitVersion(version),
    cli: userAgent?.startsWith('node-fetch'),
  };
  await table.insert([row]);
};

type DistTag = 'latest' | 'next';

const versions = async () => {
  logger.log('fetching versions');

  async function getVersionData(distTag: DistTag) {
    const data = JSON.parse(
      await readFile(
        new URL(path.join(versionFilesDir, `${distTag}.json`), import.meta.url),
        'utf8',
      ),
    );
    // Strip off no-longer-used `info` property
    const { version } = data as { version: string };
    return { version };
  }

  const latest = await getVersionData('latest');
  const next = await getVersionData('next');

  return JSON.stringify({ latest, next });
};

export async function GET(request: NextRequest) {
  const { searchParams } = request.nextUrl;

  const res = await Promise.all([versions(), log(searchParams)]);

  return new Response(res[0], {
    status: 200,
    headers: { 'Access-Control-Allow-Origin': '*' },
  });
}
