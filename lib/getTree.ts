import fs from "fs";
import path from "path";
import { getSlug } from "./getSlug";
import { getPage } from "./getPage";
import dirTree from "directory-tree";

export async function getTree(): Promise<TreeNodeProps[] | undefined> {
  // -----------------------------------------------------------------------
  // Get all pages + metadata
  // -----------------------------------------------------------------------

  const listOfPaths: string[] = [];
  const pages: Meta[] = [];

  function walkDir(dir: string, callback: (filePath: string) => void) {
    fs.readdirSync(dir).forEach((f) => {
      let dirPath = path.join(dir, f);
      let isDirectory = fs.statSync(dirPath).isDirectory();
      isDirectory ? walkDir(dirPath, callback) : callback(path.join(dir, f));
    });
  }

  walkDir("content/docs", function (filePath: string) {
    listOfPaths.push(filePath);
  });

  const listOfPathsWithoutContent = listOfPaths.map((path) =>
    path.replace("content/", "")
  );

  for (const file of listOfPathsWithoutContent) {
    const post = await getPage(file);
    if (post) {
      const { meta } = post;
      pages.push(meta);
    }
  }

  if (!pages) return undefined;

  // -----------------------------------------------------------------------
  // Create temporary tree
  // This helps to create the scaffolding for the tree
  // -----------------------------------------------------------------------

  const tree = dirTree("content/docs") as unknown;
  const docsTree = tree as TemporaryTreeNodeProps;

  // -----------------------------------------------------------------------
  // Add the correct data to the tree
  // Use case 1 - Folder with only leafs (no index file)
  // Use case 2 - Folder with only leafs (with index file)
  // Use case 3 - Folder with leaf + folders (no index file)
  // Use case 4 - Folder with leaf + folders (with index file)
  // Use case 5 - Folder with showAsTabs in frontmatter in level 2
  // Use case 6 - Folder with showAsTabs in frontmatter in level 3
  // -----------------------------------------------------------------------

  const addPageDataToTreeNode = (
    node: TemporaryTreeNodeProps,
    parent: TemporaryTreeNodeProps
  ) => {
    const findNode = pages.find(
      (page) => page.path === node.path.replace("content/", "")
    );
    const nodeData = { ...findNode };
    delete nodeData.segments;

    // We have a folder with children
    if (node.children && node.children.length > 0) {
      // Check if folders have an index file
      const indexPage = node.children.find((c: any) => c.name === "index.mdx");
      // if it doesn't have an index file, well ... damage control.
      // To control the sidebar, you need to have an index file.
      if (!indexPage) {
        Object.assign(node, {
          path: node.path,
          title: node.name,
          shortTitle: node.name,
          slug: getSlug(node.name),
          showAsTabs: false,
        });
      }
    }

    // we're at a leaf node, an actual file
    if (!node.children) {
      //this leaf node is an index page that needs to be added to the parent node
      if (node.name === "index.mdx") {
        Object.assign(parent, nodeData);

        // Remove the index page from the children array
        // Except if it has showAsTabs in the frontmatter
        if (nodeData.showAsTabs === false) {
          parent.children.splice(parent.children.indexOf(node), 1);
        }

        return;
      }

      // this leaf node is a page whose info needs to be added to the current node
      Object.assign(node, nodeData);

      return;
    }

    // we're not at a leaf node, so we need to keep traversing the tree
    node.children.forEach((child) => {
      addPageDataToTreeNode(child, node);
    });
  };

  // Since we are mutating the tree, we need to cast it to any
  addPageDataToTreeNode(
    {
      path: "",
      name: "",
      children: [docsTree],
    },
    docsTree
  );

  // And then we need to cast it back to TreeNodeProps
  const treeToReturn = tree as TreeNodeProps;
  return treeToReturn.children;
}
