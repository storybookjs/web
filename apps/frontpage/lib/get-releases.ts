import fs from "node:fs";

export const getReleases = () => {
  const releases: string[] = [];

  fs.readdirSync("content/releases").forEach((f) => {
    releases.push(f.replace(".md", ""));
  });

  return releases;
};
