import { GraphQLClient } from 'graphql-request';

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
