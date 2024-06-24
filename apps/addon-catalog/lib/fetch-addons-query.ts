import { GraphQLClient } from 'graphql-request';

export { gql } from 'graphql-request';

const client = new GraphQLClient(process.env.NEXT_PUBLIC_ADDONS_API_ENDPOINT || '');

export async function fetchAddonsQuery<
  D,
  V extends Record<string, unknown> = Record<string, never>,
>(query: string, { variables }: { variables?: V } = {}) {
  async function main() {
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
