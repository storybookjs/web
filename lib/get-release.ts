import { compileMDX } from "next-mdx-remote/rsc";
import fs from "fs";
import { mdxComponents, mdxOptions } from "./mdx";

export async function getRelease(version: string) {
  if (!version) return undefined;

  const fileContent = fs.readFileSync(`content/releases/${version}.md`, "utf8");

  return await compileMDX<{
    title: string;
    short_title?: string;
    show_as_tab?: boolean;
  }>({
    source: fileContent,
    components: mdxComponents,
    options: mdxOptions,
  });
}
