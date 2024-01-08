import { docsVersions } from "@/docs-versions";
import { getPageData } from "./get-page-data";

export const findPage = async (
  pages: TreeProps[] | undefined,
  slug: string[],
  version: string
) => {
  const hasVersionInUrl = docsVersions.some((version) => {
    return slug[0] === version.id;
  });

  const pageInTree =
    pages &&
    pages.find((page) => {
      const pageSlug = `${version}${page.slug}`;
      let path = "";
      if (hasVersionInUrl)
        path = `${slug[0]}/docs${
          slug.length > 1 ? `/${slug.slice(1).join("/")}` : ""
        }`;
      if (!hasVersionInUrl)
        path = `${version}/docs${slug ? `/${slug.join("/")}` : ""}`;

      return pageSlug === path;
    });

  const page = await getPageData(pageInTree?.path || "", version);

  return page;
};
