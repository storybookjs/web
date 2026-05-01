import { GraphQLClient, gql } from 'graphql-request';
import { validateResponse } from './validate-response';

export { gql } from 'graphql-request';

const client = new GraphQLClient(
  'https://boring-heisenberg-43a6ed.netlify.app/',
);

const requestQueue: (() => void)[] = [];
let isProcessingQueue = false;

async function processQueue() {
  if (isProcessingQueue || requestQueue.length === 0) {
    return;
  }
  isProcessingQueue = true;

  while (requestQueue.length > 0) {
    const release = requestQueue.shift()!;
    await new Promise((r) => {
      setTimeout(r, 1000);
    });
    release();
  }

  isProcessingQueue = false;
}

async function waitInQueue(): Promise<void> {
  return new Promise((resolve) => {
    requestQueue.push(resolve);
    // eslint-disable-next-line @typescript-eslint/no-floating-promises -- Resolved when pulled from the queue.
    processQueue();
  });
}

export async function fetchAddonsQuery<
  D,
  V extends Record<string, unknown> = Record<string, never>,
>(query: string, { variables }: { variables?: V } = {}) {
  // Protects our server in CI by preventing dozens of concurrent requests.
  if (process.env.SLOW_GRAPHQL_CLIENT) {
    await waitInQueue();
  }

  try {
    return await client.request<D>(query, variables);
  } catch (error) {
    throw new Error(
      `Failed to fetch Addons query, ${JSON.stringify(error, null, 2)}`,
    );
  }
}

interface NamesPage {
  addons?: { name: string }[];
  tags?: { name: string }[];
}

export async function fetchAddonsData(): Promise<string[]> {
  const value: string[] = [];
  async function fetchPage(skip = 0): Promise<void> {
    const data = await fetchAddonsQuery<NamesPage, { skip: number }>(
      gql`
        query Addons($skip: Int!) {
          addons(limit: 30, skip: $skip) {
            name
          }
        }
      `,
      { variables: { skip } },
    );
    validateResponse(() => data.addons);
    const page = data.addons ?? [];
    value.push(...page.map(({ name }) => name));
    if (page.length > 0) await fetchPage(skip + page.length);
  }
  try {
    await fetchPage();
    return value;
  } catch (error) {
    throw new Error(`Failed to fetch addons data: ${(error as Error).message}`);
  }
}

export async function fetchTagsData({
  isCategory,
}: { isCategory?: boolean } = {}): Promise<string[]> {
  const value: string[] = [];
  async function fetchPage(skip = 0): Promise<void> {
    const data = await fetchAddonsQuery<
      NamesPage,
      { isCategory: boolean; skip: number }
    >(
      gql`
        query TagNames($isCategory: Boolean!, $skip: Int!) {
          tags(isCategory: $isCategory, limit: 30, skip: $skip) {
            name
          }
        }
      `,
      { variables: { isCategory: Boolean(isCategory), skip } },
    );
    validateResponse(() => data.tags);
    const page = data.tags ?? [];
    value.push(...page.map(({ name }) => name));
    if (page.length > 0) await fetchPage(skip + page.length);
  }
  try {
    await fetchPage();
    return value;
  } catch (error) {
    throw new Error(`Failed to fetch tags data: ${(error as Error).message}`);
  }
}
