import { GraphQLClient } from 'graphql-request';

export { gql } from 'graphql-request';

const client = new GraphQLClient(
  'https://boring-heisenberg-43a6ed.netlify.app/',
);

// Global request queue for rate limiting
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
    // eslint-disable-next-line @typescript-eslint/no-floating-promises -- This is intentional, we will be pulled out of queue when it's our turn to be processed.
    processQueue();
  });
}

export async function fetchAddonsQuery<
  D,
  V extends Record<string, unknown> = Record<string, never>,
>(query: string, { variables }: { variables?: V } = {}) {
  async function main() {
    return await client.request<D>(query, variables);
  }

  // Protects our server in CI, by preventing dozens of concurrent requests.
  if (process.env.SLOW_GRAPHQL_CLIENT) {
    await waitInQueue();
  }

  try {
    return await main();
  } catch (error) {
    throw new Error(
      `Failed to fetch Addons query, ${JSON.stringify(error, null, 2)}`,
    );
  }
}
