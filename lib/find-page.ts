import { docsVersions } from "@/docs-versions";
import { getPageData } from "./get-page-data";

export const findPage = async (
  pages: TreeProps[] | undefined,
  slug: string[],
  version: string
) => {
  const hasVersionInUrl = slug
    ? docsVersions.some((version) => {
        return slug[0] === version.id;
      })
    : false;

  const pageInTree =
    pages &&
    pages.find((page) => {
      const pageSlug = page.slug;
      let path = "";
      if (hasVersionInUrl)
        path = `/docs${slug.length > 1 ? `/${slug.slice(1).join("/")}` : ""}`;
      if (!hasVersionInUrl) path = `/docs${slug ? `/${slug.join("/")}` : ""}`;

      console.log("pageSlug", pageSlug);
      console.log("path", path);

      return pageSlug === path;
    });

  const page = await getPageData({
    path: pageInTree?.path || "",
    version: { id: version },
  });

  return page;
};
