import { basePath, host } from '../next.config.mjs';

export async function fetchAddonDetailsData(
  name: string,
): Promise<Addon | null> {
  let addon: Addon | null = null;
  try {
    const res = await fetch(`${host}${basePath}/api/addon/${name}`);
    addon = await res.json();
  } catch (error) {
    // @ts-expect-error - Seems safe
    throw new Error(`Failed to fetch addon details data: ${error.message}`);
  }

  return addon;
}
