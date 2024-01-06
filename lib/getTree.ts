import fs from "fs";
import path from "path";
import { getPage } from "./getPage";

export async function getTree(
  version: string
): Promise<PageProps[] | undefined> {
  const listOfPaths: string[] = [];
  const pages: PageProps[] = [];
  const rootTree = `content/docs/${version}/docs`;

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

  for (const file of listOfPaths) {
    const post = await getPage(file);
    if (post) pages.push(post);
  }

  const rootPages = pages.filter((page) => page.level === 1);

  const rootPagesWithChildren: PageProps[] = rootPages.map((rootPage) => {
    const level2 = pages
      .filter((page) => page.level === 2)
      .filter((child) => child.parent === rootPage.id);

    const children = level2.map((child) => {
      const level3 = pages
        .filter((page) => page.level === 3)
        .filter((lvl3) => lvl3.parent === child.id);

      if (child.showAsTabs) return { ...child, tabs: level3 };
      return { ...child, children: level3 };
    });

    return { ...rootPage, children };
  });

  return rootPagesWithChildren;
}
