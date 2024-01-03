import fs from "fs";

export const getReleases = () => {
  const releases: string[] = [];

  fs.readdirSync("content/releases").forEach((f) => {
    releases.push(f.replace(".md", ""));
  });

  return releases;
};
