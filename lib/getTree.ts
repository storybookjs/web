import { getPage } from "./getPage";

export async function getTree(): Promise<TreeNodeProps[] | undefined> {
  // -----------------------------------------------------------------------
  // Fetch all docs pages from the repo
  // -----------------------------------------------------------------------
  const res = await fetch(
    "https://api.github.com/repos/storybookjs/web/git/trees/main?recursive=1",
    {
      headers: {
        Accept: "application/vnd.github+json",
        Authorization: `Bearer ${process.env.GITHUB_STORYBOOK_BOT_PAT}`,
        "X-GitHub-Api-Version": "2022-11-28",
        "User-Agent": "storybook-bot",
      },
      cache: "no-store", // To remove when solving the cache error
    }
  );

  if (!res.ok) return undefined;

  const repoFiletree: {
    tree: [{ path: string }];
  } = await res.json();

  const filesArray = repoFiletree.tree
    .map((obj) => obj.path)
    .filter(
      (path) =>
        [".mdx", "md"].some((e) => path.endsWith(e)) && path.startsWith("docs/")
    );

  const pages: Meta[] = [];

  for (const file of filesArray) {
    const post = await getPage(file);
    if (post) {
      const { meta } = post;
      pages.push(meta);
    }
  }

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
  // New test
  // -----------------------------------------------------------------------

  // console.dir({ tree }, { depth: null });

  const newTree = tree.map((node) => {
    const findPage = pages.find((page) => page.id === node.id);
    // if doesn't have children, it's a leaf node, bring data from page
    if (node.children.length === 0) {
      const newData = { ...findPage };
      delete newData.segments;
      return newData;
    }

    // if has children, it's a folder
    if (node.children.length > 0) {
      // First check if this folder has an index file
      const indexPage = node.children.find(
        (c: any) => c.currentSegment === "index"
      );

      const parentData = {};

      if (indexPage) {
        // if it has an index file, bring data from index page
        const findIndexPage = pages.find((page) => page.id === indexPage.id);
        const newData = { ...findIndexPage };
        delete newData.segments;
        Object.assign(parentData, newData);
      } else {
        // if it doesn't have an index file, well ... damage control.
        // To control the sidebar, you need to have an index file.
        Object.assign(parentData, {
          id: node.id,
          title: node.currentSegment,
          sidebarTitle: node.currentSegment,
        });
      }

      const childrenData: any[] = [];

      node.children.forEach((child: any) => {
        if (child.children.length > 0) {
          // Find if one of the children as currentSegment as "index"
          const indexPage = child.children.find(
            (c: any) => c.currentSegment === "index"
          );

          const level2Data = {};

          if (indexPage) {
            // if it has an index file, bring data from index page
            const findIndexPage = pages.find(
              (page) => page.id === indexPage.id
            );
            const newData = { ...findIndexPage };
            delete newData.segments;
            Object.assign(level2Data, newData);
          } else {
            Object.assign(level2Data, {
              id: child.id,
              title: child.currentSegment,
              sidebarTitle: child.currentSegment,
            });
          }

          childrenData.push(level2Data);
        }

        // Coco boule
        // const findChildPage = pages.find((page) => page.id === child.id);
        // const findTreeChild = tree.find(
        //   (treeChild) => treeChild.id === child.id
        // );
        // if (findTreeChild?.id.startsWith("docs/02-stories")) {
        //   console.log("PAAAAAAAAAGE", findChildPage);
        //   console.log("TREEEEEEEEEEE", findTreeChild);
        // }
        //   if (child.children.length === 0) {
        //     const newData = { ...findChildPage };
        //     delete newData.segments;
        //     if (child.currentSegment !== "index") {
        //       childrenData.push(newData);
        //     }
        //   }
        //   if (child.children.length > 0) {
        //     const newData = { ...findChildPage };
        //     delete newData.segments;
        //     // Hello
        //     // const lvl2Data: any[] = [];
        //     // child.children.forEach((lvl2: any) => {
        //     //   const findLvl2Page = pages.find((page) => page.id === lvl2.id);
        //     //   const newData = { ...findLvl2Page };
        //     //   delete newData.segments;
        //     //   lvl2Data.push(newData);
        //     // });
        //     // newData.children = lvl2Data;
        //     childrenData.push(newData);
        //   }
      });

      // and finally, return the data
      return {
        ...parentData,
        children: childrenData,
      };
    }
  });

  console.dir({ newTree }, { depth: null });

  // -----------------------------------------------------------------------
  // Add the correct data to the tree
  // If a folder has an index file (index.mdx), then the folder's data
  // should be the index file's data. If a folder doesn't have an index
  // file, then the folder's data should not have anything.
  // -----------------------------------------------------------------------
  const addPageDataToTreeNode = (
    node: TemporaryTreeNodeProps,
    parent: TemporaryTreeNodeProps
  ) => {
    if (node.children.length === 0) {
      // we're at a leaf node, an actual file
      if (node.currentSegment === "index") {
        //this leaf node is an index page that needs to be added to the parent node
        Object.assign(
          parent,
          pages.find((page) => page.id === node.id)
        );
        parent.children.splice(parent.children.indexOf(node), 1);
        // delete parent.children[parent.children.indexOf(node)];
        return;
      }
      // this leaf node is a page whose info needs to be added to the current node
      Object.assign(
        node,
        pages.find((page) => page.id === node.id)
      );
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
  return newTree as TreeNodeProps[];
}
