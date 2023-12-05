import { getPages } from "./getPages";
import { getSlug } from "./getSlug";

export async function getTree(): Promise<TreeNodeProps[] | undefined> {
  // -----------------------------------------------------------------------
  // Fetch pages from Storybook monorepo
  // -----------------------------------------------------------------------
  const pages = await getPages();
  if (!pages) return undefined;

  // -----------------------------------------------------------------------
  // Create temporary tree
  // This helps to create the scaffolding for the tree
  // -----------------------------------------------------------------------
  const tree: any[] = [];
  pages.forEach((page) => {
    let currentLevel = tree;

    page.segments.forEach((currentSegment) => {
      const existingPath = currentLevel.find(
        (e) => e.currentSegment === currentSegment
      );

      if (existingPath) {
        currentLevel = existingPath.children;
      } else {
        const newPart = {
          currentSegment,
          id: page.id,
          children: [],
        };

        currentLevel.push(newPart);
        currentLevel = newPart.children;
      }
    });
  });

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
    const findNode = pages.find((page) => page.id === node.id);
    const nodeData = { ...findNode };
    delete nodeData.segments;

    // We have a folder with children
    if (node.children.length > 0) {
      // Check if folders have an index file
      const indexPage = node.children.find(
        (c: any) => c.currentSegment === "index"
      );
      // if it doesn't have an index file, well ... damage control.
      // To control the sidebar, you need to have an index file.
      if (!indexPage) {
        Object.assign(node, {
          id: node.id,
          title: node.currentSegment,
          shortTitle: node.currentSegment,
          slug: getSlug(node.currentSegment),
          showAsTabs: false,
        });
      }
    }

    // we're at a leaf node, an actual file
    if (node.children.length === 0) {
      //this leaf node is an index page that needs to be added to the parent node
      if (node.currentSegment === "index") {
        Object.assign(parent, nodeData);
        // Remove the index page from the children array

        if (nodeData.showAsTabs === false) {
          parent.children.splice(parent.children.indexOf(node), 1);
        }
        return;
      }

      // this leaf node is a page whose info needs to be added to the current node
      Object.assign(node, nodeData, { children: null });

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
      children: tree,
      currentSegment: "",
      id: "",
    },
    tree as any
  );

  // And then we need to cast it back to TreeNodeProps
  return tree as TreeNodeProps[];
}
