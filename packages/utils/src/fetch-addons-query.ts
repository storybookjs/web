/* eslint-disable @typescript-eslint/explicit-function-return-type -- TODO Fix this */

import { GraphQLClient } from 'graphql-request';

export { gql } from 'graphql-request';

const client = new GraphQLClient(
  'https://boring-heisenberg-43a6ed.netlify.app/',
);

export async function fetchAddonsQuery<
  D,
  V extends Record<string, unknown> = Record<string, never>,
>(query: string, { variables }: { variables?: V } = {}) {
  async function main() {
    // eslint-disable-next-line no-return-await -- TODO Fix this
    return await client.request<D>(query, variables);
  }

  try {
    return await main();
  } catch (error) {
    throw new Error(
      `Failed to fetch Addons query, ${JSON.stringify(error, null, 2)}`,
    );
  }
}
