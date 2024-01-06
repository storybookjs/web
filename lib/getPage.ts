import { compileMDX } from "next-mdx-remote/rsc";
import fs from "fs";
import { mdxComponents, mdxOptions } from "./mdx";

export async function getPage(path: string) {
  if (!path) return undefined;

  const fileContents = fs.readFileSync(path, "utf8");

  const { frontmatter, content } = await compileMDX<{
    title: string;
    short_title?: string;
    tabs?: string;
  }>({
    source: fileContents,
    components: mdxComponents,
    options: mdxOptions,
  });

  const pathWithoutExtension = path.replace(/\.mdx?$/, "");
  const segments = pathWithoutExtension.split("/");
  const lastSegment = pathWithoutExtension.split("/").pop() || "";
  const isLeaf = lastSegment !== "index";

  const id =
    lastSegment === "index" ? segments[segments.length - 2] : lastSegment;

  let level = 0;
  // Find level for all index pages
  if (lastSegment === "index" && segments.length === 6) level = 1;
  if (lastSegment === "index" && segments.length === 7) level = 2;
  if (lastSegment === "index" && segments.length === 8) level = 3;

  // Find level for all leaf pages
  if (lastSegment !== "index" && segments.length === 7) level = 3;
  if (lastSegment !== "index" && segments.length === 8) level = 4;

  let parent = null;
  if (level === 2 && isLeaf) parent = segments[segments.length - 2];
  if (level === 2 && !isLeaf) parent = segments[segments.length - 3];
  if (level === 3 && isLeaf) parent = segments[segments.length - 2];
  if (level === 3 && !isLeaf) parent = segments[segments.length - 3];

  // Create slug
  let slug = "/docs/";
  const removeOrderNumber = (segment: string) => segment.replace(/^\d+-/, "");
  const pathPlace = (n: number) => (lastSegment === "index" ? n : n - 1);

  if (lastSegment === "index" && level === 1) {
    const path1 = removeOrderNumber(segments[segments.length - pathPlace(2)]);
    slug = `/docs/${path1}`;
  }
  if (level === 2) {
    const path1 = removeOrderNumber(segments[segments.length - pathPlace(3)]);
    const path2 = removeOrderNumber(segments[segments.length - pathPlace(2)]);
    slug = `/docs/${path1}/${path2}`;
  }
  if (level === 3) {
    const path1 = removeOrderNumber(segments[segments.length - pathPlace(4)]);
    const path2 = removeOrderNumber(segments[segments.length - pathPlace(3)]);
    const path3 = removeOrderNumber(segments[segments.length - pathPlace(2)]);
    slug = `/docs/${path1}/${path2}/${path3}`;
  }

  const pageObj: PageProps = {
    id,
    path,
    slug,
    title: frontmatter.title,
    shortTitle: frontmatter.short_title || frontmatter.title || "",
    parent,
    showAsTabs: frontmatter.tabs === "true" ? true : false,
    segments,
    level,
    content,
  };

  return pageObj;
}
