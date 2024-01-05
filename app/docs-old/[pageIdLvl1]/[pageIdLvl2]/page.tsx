import { notFound } from "next/navigation";
import "highlight.js/styles/github-dark.css";
import { getTree } from "@/lib/getTree";
import { getPage } from "@/lib/getPage";
import { Article } from "@/components/article";

// export const revalidate = 86400;
export const revalidate = 0;

type Props = {
  params: {
    pageIdLvl1: string;
    pageIdLvl2: string;
  };
};

// export async function generateStaticParams() {
//   const pages = await getTree();

//   if (!pages) return [];

//   return pages.map((page) => ({
//     pageId: page.id,
//   }));
// }

// export async function generateMetadata({
//   params: { pageIdLvl1, pageIdLvl2 },
// }: Props) {
//   // Check if the page exists on its own
//   const page = await getPage(`docs/${pageIdLvl1}/${pageIdLvl2}.mdx`);

//   // if not, check if it exists as an index
//   const pageIndex = await getPage(`docs/${pageIdLvl1}/${pageIdLvl2}/index.mdx`);

//   if (!page && !pageIndex) {
//     return {
//       title: "Page Not Found",
//     };
//   }

//   const meta = page ? page.meta : pageIndex?.meta;

//   return {
//     title: meta?.title || "Storybook",
//   };
// }

export async function generateMetadata({
  params: { pageIdLvl1, pageIdLvl2 },
}: Props) {
  const tree = await getTree();
  const findLvl1 = tree && tree.find((page) => page.slug === pageIdLvl1);
  const pageInTree = findLvl1?.children.find(
    (page) => page.slug === pageIdLvl2
  );

  // Check if the page exists on its own
  const page = await getPage(pageInTree?.path || "");

  if (!page) {
    return {
      title: "Page Not Found",
    };
  }

  return {
    title: page.meta?.title || "Storybook",
  };
}

export default async function Post({
  params: { pageIdLvl1, pageIdLvl2 },
}: Props) {
  const tree = await getTree();
  const findLvl1 = tree && tree.find((page) => page.slug === pageIdLvl1);
  const pageInTree = findLvl1?.children.find(
    (page) => page.slug === pageIdLvl2
  );

  const page = await getPage(pageInTree?.path || "");

  if (!page) notFound();

  return (
    <Article
      title={page.meta.title}
      isIndex={page?.meta.showAsTabs}
      isApi={pageInTree?.name === "api"}
      pathIndex={`/docs/${pageIdLvl1}/${pageIdLvl2}`}
      pathApi={`/docs/${pageIdLvl1}`}
      content={page.content}
    />
  );
}
