import fs from "fs";
import { bundleMDX } from "mdx-bundler";

export async function getRelease(version: string) {
  if (!version) return undefined;

  const fileContent = fs.readFileSync(`content/releases/${version}.md`, "utf8");

  return await bundleMDX<TreeMetaProps>({
    source: fileContent,
  });
}
