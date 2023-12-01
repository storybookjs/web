import { getPage } from "./getPage";

export async function getTree(): Promise<TreeNodeProps[] | undefined> {
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

  const tree: TreeNodeProps[] = [];

  const map = pages.map((page) => page.segments);
  console.log("mappy", map);

  const miniTree: any[] = [];

  // pages.forEach((page) => {
  //   let currentLevel = miniTree;

  //   if (page.segments.length === 1) {
  //     const newData = {
  //       segment: page.segments[0],
  //       children: [],
  //     };

  //     currentLevel.push(newData);
  //   }

  //   if (page.segments.length === 2) {
  //     let existingPath = currentLevel.find(
  //       (e) => e.segment === page.segments[0]
  //     );

  //     if (existingPath) {
  //       if (page.segments[1] !== "index") {
  //         const newData = {
  //           segment: page.segments[1],
  //           children: [],
  //         };
  //         existingPath.children.push(newData);
  //       }
  //     } else {
  //       const newData = {
  //         segment: page.segments[0],
  //         children: [
  //           {
  //             segment: page.segments[1],
  //             children: [],
  //           },
  //         ],
  //       };

  //       currentLevel.push(newData);
  //     }
  //   }
  // });

  pages.forEach((page) => {
    let currentLevel = miniTree;

    page.segments.forEach((segment) => {
      const existingPath = currentLevel.find((e) => e.segment === segment);

      if (existingPath) {
        currentLevel = existingPath.children;
      } else {
        const newPart = {
          segment,
          children: [],
        };

        if (segment !== "index") {
          currentLevel.push(newPart);
          currentLevel = newPart.children;
        }
      }
    });
  });

  console.log(pages);

  miniTree.forEach((node, i) => {
    let currentLevel = miniTree;
    const pageIndex = pages.find(
      (page) =>
        page.segments[0] === node.segment && page.segments[1] === "index"
    );

    console.log("page", pageIndex);

    if (pageIndex?.segments.length === 2 && pageIndex.segments[1] === "index") {
      currentLevel[i] = {
        ...node,
        ...pageIndex,
      };
    }
  });

  pages.forEach((page) => {
    let currentLevel = tree;

    page.segments.forEach((segment) => {
      const existingPath = currentLevel.find((e) => e.segment === segment);

      if (existingPath) {
        currentLevel = existingPath.children;
      } else {
        const newPart = {
          ...page,
          segment,
          children: [],
        };

        if (segment === "index") {
          // currentLevel.push(newPart);
          // currentLevel = newPart.children;
        } else {
          currentLevel.push(newPart);
          currentLevel = newPart.children;
        }
      }
    });
  });

  return miniTree;
}
