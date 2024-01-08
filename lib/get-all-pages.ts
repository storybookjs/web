import { getPageData } from "./get-page-data";
import { getListOfPaths } from "./get-list-of-paths";
import { docsVersions } from "@/docs-versions";

export async function getAllPages(
  version: string,
  slug?: string[]
): Promise<TreeProps[] | undefined> {
  const listOfPaths = getListOfPaths(version);
  const pages: PageMetaProps[] = [];

  const hasVersionInUrl = slug
    ? docsVersions.some((version) => {
        return slug[0] === version.id;
      })
    : false;

  // For every path, get the page
  for (const file of listOfPaths) {
    const post = await getPageData({
      path: file,
      version: { id: version, isInTheUrl: hasVersionInUrl },
      options: { metaOnly: true },
    });
    if (file.includes("content/docs/8.0-test-2/docs/index")) {
      console.log(file);
      console.log(post);
    }
    if (post) pages.push(post);
  }

  return pages;
}
