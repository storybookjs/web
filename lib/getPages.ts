import { getPage } from "./getPage";

export async function getPages(): Promise<Meta[] | undefined> {
  // -----------------------------------------------------------------------
  // Fetch all docs pages from the repo
  // -----------------------------------------------------------------------
  const resMainTree = await fetch(
    "https://api.github.com/repos/storybookjs/storybook/git/trees/charles-docs-new-structure",
    {
      headers: {
        Accept: "application/vnd.github+json",
        Authorization: `Bearer ${process.env.GITHUB_STORYBOOK_BOT_PAT}`,
        "X-GitHub-Api-Version": "2022-11-28",
        "User-Agent": "storybook-bot",
      },
    }
  );

  if (!resMainTree.ok) return undefined;

  const mainRepo = await resMainTree.json();
  const docsDirectory = mainRepo.tree.find(
    (tree: { path: string; url: string }) => tree.path === "docs"
  );

  if (!docsDirectory) return undefined;

  const res = await fetch(`${docsDirectory.url}?recursive=1`, {
    headers: {
      Accept: "application/vnd.github+json",
      Authorization: `Bearer ${process.env.GITHUB_STORYBOOK_BOT_PAT}`,
      "X-GitHub-Api-Version": "2022-11-28",
      "User-Agent": "storybook-bot",
    },
  });

  if (!res.ok) return undefined;

  const repoFiletree: {
    tree: { path: string }[];
  } = await res.json();

  const listOfPaths = repoFiletree.tree.map((obj) => obj.path);
  const filteredList = listOfPaths
    .filter((path) => !path.startsWith("_assets/"))
    .filter((path) => !path.startsWith("_snippets/"))
    .filter((path) => !path.startsWith("_versions/"))
    .filter((path) => [".mdx"].some((e) => path.endsWith(e)));

  const pages: Meta[] = [];

  for (const file of filteredList) {
    const post = await getPage(file);
    console.log("post", post);
    if (post) {
      const { meta } = post;
      pages.push(meta);
    }
  }

  console.log("list", pages);

  return pages;
}
