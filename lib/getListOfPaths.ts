import fs from "fs";
import path from "path";

export function getListOfPaths(version: string) {
  const listOfPaths: string[] = [];
  // const rootTree = `content/docs/${version}/docs`;
  const rootTree = "content/test-docs";

  // Fetch the list of paths
  function walkDir(dir: string, callback: (filePath: string) => void) {
    fs.readdirSync(dir).forEach((f) => {
      let dirPath = path.join(dir, f);
      let isDirectory = fs.statSync(dirPath).isDirectory();
      isDirectory ? walkDir(dirPath, callback) : callback(path.join(dir, f));
    });
  }

  walkDir(rootTree, function (filePath: string) {
    listOfPaths.push(filePath);
  });

  return listOfPaths;
}
