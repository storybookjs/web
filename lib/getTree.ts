import { getPageByName } from "./getPageByName";

type Filetree = {
  tree: [
    {
      path: string;
    }
  ];
};

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

  const repoFiletree: Filetree = await res.json();

  const filesArray = repoFiletree.tree
    .map((obj) => obj.path)
    .filter(
      (path) =>
        [".mdx", "md"].some((e) => path.endsWith(e)) && path.startsWith("docs/")
    );

  const pages: Meta[] = [];

  for (const file of filesArray) {
    const post = await getPageByName(file);
    if (post) {
      const { meta } = post;
      pages.push(meta);
    }
  }

  const tree: TreeNodeProps[] = [];

  pages.forEach((page) => {
    let currentLevel = tree;
    page.paths.forEach((path, j) => {
      const existingPath = currentLevel.find((e) => e.name === path);

      if (existingPath) {
        currentLevel = existingPath.children;
      } else {
        var newPart = {
          name: path,
          ...page,
          children: [],
        };

        currentLevel.push(newPart);
        currentLevel = newPart.children;
      }
    });
  });

  return tree;
}
