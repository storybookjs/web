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
  };
};

// export async function generateStaticParams() {
//   const pages = await getTree();

//   if (!pages) return [];

//   return pages.map((page) => ({
//     pageIdLvl1: page.id,
//   }));
// }

export async function generateMetadata({ params: { pageIdLvl1 } }: Props) {
  const tree = await getTree();
  const pageInTree = tree && tree.find((page) => page.slug === pageIdLvl1);

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

export default async function Post({ params: { pageIdLvl1 } }: Props) {
  const tree = await getTree();
  const pageInTree = tree && tree.find((page) => page.slug === pageIdLvl1);
  const page = await getPage(pageInTree?.path || "");

  if (!page) notFound();

  return (
    <Article
      title={page.meta.title}
      isIndex={page?.meta.showAsTabs}
      isApi={pageInTree?.name === "api"}
      pathIndex={`/docs/${pageIdLvl1}`}
      pathApi="/docs"
      content={page.content}
    />
  );
}
