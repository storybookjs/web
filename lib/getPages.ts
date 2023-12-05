import fs from "fs";
import path from "path";
import { getPage } from "./getPage";

function walkDir(dir: string, callback: (filePath: string) => void) {
  fs.readdirSync(dir).forEach((f) => {
    let dirPath = path.join(dir, f);
    let isDirectory = fs.statSync(dirPath).isDirectory();
    isDirectory ? walkDir(dirPath, callback) : callback(path.join(dir, f));
  });
}

export async function getPages(): Promise<Meta[] | undefined> {
  const listOfPaths: string[] = [];

  walkDir("content/docs", function (filePath: string) {
    listOfPaths.push(filePath);
  });

  const listOfPathsWithoutContent = listOfPaths.map((path) =>
    path.replace("content/", "")
  );
  const pages: Meta[] = [];

  for (const file of listOfPathsWithoutContent) {
    const post = await getPage(file);
    if (post) {
      const { meta } = post;
      pages.push(meta);
    }
  }

  return pages;
}
