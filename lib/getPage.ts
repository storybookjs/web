import { compileMDX } from "next-mdx-remote/rsc";
import fs from "fs";
import { mdxComponents, mdxOptions } from "./mdx";
import { getListOfPaths } from "./getListOfPaths";

export async function getPage(path: string, options?: { metaOnly?: boolean }) {
  if (!path) return undefined;

  const fileContents = fs.readFileSync(path, "utf8");

  const { frontmatter, content } = await compileMDX<{
    title: string;
    sidebar?: {
      title?: string;
      order: number;
    };
    tabs?: string;
  }>({
    source: fileContents,
    components: mdxComponents,
    options: mdxOptions,
  });

  // Clean up path
  const relativePath = path.replace("content/test-docs/", "");
  const pathWithoutExtension = relativePath.replace(/\.mdx?$/, "");

  const segments = pathWithoutExtension.split("/");
  const lastSegment = pathWithoutExtension.split("/").pop() || "";
  const isIndex = lastSegment === "index";

  // Create index - Used also for the slug
  const id = isIndex
    ? pathWithoutExtension.replace("/index", "")
    : pathWithoutExtension;

  const parent = id.split("/").slice(0, -1).join("/") || null;

  // Is tab
  const regex = /.*\[[^\]]*\].*/;
  const isTab = regex.test(pathWithoutExtension);

  // Find other tabs that
  const tabs = [];

  const getTabs = (segment: string, path: string): string[] => {
    const array: string[] = [];
    const listOfPaths = getListOfPaths("test-docs");
    const findTabs = listOfPaths.filter((p) => p.includes(path));
    if (findTabs && findTabs.length > 0) {
      array.push(segment);
      array.push(
        // @ts-ignore
        ...findTabs.map((path) =>
          path
            .replace(/\.mdx?$/, "")
            .split("/")
            .pop()
        )
      );
    }
    return array;
  };

  if (isTab) {
    // Find list of tabs for a subpage
    const tabsParentId = segments[segments.length - 2].replace(/^\[|\]$/g, "");
    const listOfTabs = getTabs(tabsParentId, segments.slice(0, -1).join("/"));
    tabs.push(...listOfTabs);
  } else {
    // Find list of tabs for the main page
    const tabPath = pathWithoutExtension.split("/");
    tabPath[tabPath.length - 1] = `[${tabPath[tabPath.length - 1]}]`;
    const listOfTabs = getTabs(lastSegment, tabPath.join("/"));
    tabs.push(...listOfTabs);
  }

  // Create slug
  let slug = `/docs/${id}`;

  if (parent && parent.includes("[index]")) slug = slug.replace("/[index]", "");

  const page: PageMetaProps = {
    id,
    path,
    slug: slug.replace(/\[|\]/g, ""),
    title: frontmatter.title,
    shortTitle: frontmatter?.sidebar?.title || frontmatter?.title || "",
    parent,
    isTab,
    tabs,
    order: frontmatter?.sidebar?.order || 0,
  };

  if (options?.metaOnly === true) return page;

  const pageWithContent: PageProps = {
    ...page,
    content,
  };

  return pageWithContent;
}
