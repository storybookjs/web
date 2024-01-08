import { getPage } from "./getPage";
import { getListOfPaths } from "./getListOfPaths";

export async function getAllPages(
  version: string
): Promise<TreeProps[] | undefined> {
  const listOfPaths = getListOfPaths(version);
  const pages: PageMetaProps[] = [];

  // For every path, get the page
  for (const file of listOfPaths) {
    const post = await getPage(file, version, { metaOnly: true });
    if (post) pages.push(post);
  }

  return pages;
}
