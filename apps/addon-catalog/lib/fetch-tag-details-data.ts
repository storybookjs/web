import { basePath, host } from '../constants';

export async function fetchTagDetailsData(name: string): Promise<Tag | null> {
  let tag: Tag | null = null;
  try {
    const res = await fetch(`${host}${basePath}/api/tag/${name}`);
    tag = await res.json();
  } catch (error) {
    // @ts-expect-error - Seems safe
    throw new Error(`Failed to fetch tag details data: ${error.message}`);
  }

  return tag;
}
