import { compileMDX } from "next-mdx-remote/rsc";
import { getSlug } from "./getSlug";
import fs from "fs";
import { mdxComponents, mdxOptions } from "./mdx";

export async function getPage(path: string) {
  if (!path) return undefined;

  const fileContents = fs.readFileSync(`content/${path}`, "utf8");

  const { frontmatter, content } = await compileMDX<{
    title: string;
    short_title?: string;
    show_as_tab?: boolean;
  }>({
    source: fileContents,
    components: mdxComponents,
    options: mdxOptions,
  });

  const id = path.replace(/\.mdx$/, "");
  const segments = id.replace("docs/", "").split("/");
  const lastSegment = id.split("/").pop();
  const lastRealSegment =
    lastSegment === "index" ? segments[segments.length - 2] : lastSegment;
  const slug = getSlug(lastRealSegment);

  const pageObj: PageProps = {
    meta: {
      path,
      name: path.split("/").pop() || "",
      slug: slug || "",
      title: frontmatter.title,
      shortTitle: frontmatter.short_title || frontmatter.title || "",
      showAsTabs: frontmatter.show_as_tab || false,
      segments,
    },
    content,
  };

  return pageObj;
}
