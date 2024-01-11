import fs from "fs";
import { compileMDX } from "next-mdx-remote/rsc";

export async function getRelease(version: string) {
  if (!version) return undefined;

  const fileContent = fs.readFileSync(`content/releases/${version}.md`, "utf8");

  return await compileMDX<{ title: string }>({
    source: fileContent,
    options: {
      parseFrontmatter: true,
    },
  });
}
