import { getVersion } from "@/lib/get-version";
import * as MDX from "@/components/docs/mdx";
import { notFound } from "next/navigation";
import Link from "next/link";
import { cn } from "@/lib/utils";
import { renderers } from "@/docs-renderers";
import { getPageData } from "@/lib/get-page2";
import { docsVersions } from "@/docs-versions";
import { Renderers } from "@/components/docs/renderers";
import { generateDocsTree } from "@/lib/get-tree";

interface Props {
  params: {
    slug: string[];
  };
}

export const generateStaticParams = async () => {
  const result: { slug: string[] }[] = [];
  const tree = generateDocsTree();
  const treeFirstVersion = generateDocsTree(
    `content/docs/${docsVersions[0].id}`
  );

  const ids = (data: TreeProps[], removeVersion: boolean) => {
    data.forEach((item) => {
      if ("slug" in item) {
        const newSlug = item.slug.replace("/docs/", "").split("/");
        if (removeVersion) newSlug.shift();
        result.push({
          slug: newSlug,
        });
      }
      if (item.children) {
        ids(item.children, removeVersion);
      }
    });
  };

  ids(treeFirstVersion, true);
  ids(tree, false);

  return result;
};

export default async function Page({ params: { slug } }: Props) {
  const activeVersion = getVersion(slug);
  const hasVersion =
    slug?.length >= 1 && docsVersions.some((version) => slug[0] === version.id);
  const newSlug = slug ? [...slug] : [];
  if (!hasVersion) newSlug.unshift(activeVersion.id);

  const page = await getPageData(newSlug);

  if (!page) notFound();

  return (
    <div>
      <MDX.H1>{page.title || "Title is missing"}</MDX.H1>
      <Renderers activeRenderer={renderers[0].id} />
      {page.tabs && page.tabs.length > 0 && (
        <div className="flex items-center gap-8 border-b border-zinc-200">
          {page.tabs.map((tab) => {
            const isActive = tab.slug === `/docs/${slug.join("/")}`;

            return (
              <Link
                key={tab.name}
                href={tab.slug}
                className={cn(
                  "border-b -mb-px pb-2 hover:text-blue-500 transition-colors px-2 text-sm capitalize",
                  isActive && "border-b border-blue-500 text-blue-500"
                )}
              >
                {tab?.tab?.title || tab.title}
              </Link>
            );
          })}
        </div>
      )}
      <article>{page.content}</article>
    </div>
  );
}
