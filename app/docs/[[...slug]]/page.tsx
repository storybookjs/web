import { docsVersions } from "@/docs-versions";
import { getVersion } from "@/lib/getVersion";
import { H1 } from "@/components/mdx";
import { getPage } from "@/lib/getPage";
import { notFound } from "next/navigation";
import Link from "next/link";
import { getAllPages } from "@/lib/getAllPages";

export default async function TestPage({
  params,
}: {
  params: { slug: string[] };
}) {
  // Get the latest version
  const activeVersion = getVersion(params.slug);

  // Get all pages in a flat list
  const allPages = await getAllPages(activeVersion.id);

  // Get path - Make sure to take the right version
  const hasVersionInUrl =
    params.slug &&
    docsVersions.some((version) => {
      return params.slug[0] === version.id;
    });

  // Find the page in all pages
  const pageInTree =
    allPages &&
    allPages.find((page) => {
      const pageSlug = `${activeVersion.id}${page.slug}`;
      const path = hasVersionInUrl
        ? `${params.slug[0]}/docs/${params.slug.slice(1).join("/")}`
        : `${activeVersion.id}/docs/${params.slug.join("/")}`;
      return pageSlug === path;
    });
  const page = await getPage(pageInTree?.path || "", activeVersion.id);

  if (!page) notFound();

  return (
    <div>
      <H1>{page.title || "Title is missing"}</H1>
      {page.tabs && page.tabs.length > 0 && (
        <div className="flex items-center gap-8">
          {page.tabs.map((tab, index) => {
            let href = "";
            if (index === 0 && !page.isTab) href = page.slug;
            if (index === 0 && page.isTab)
              href = page.slug.split("/").slice(0, -1).join("/");
            if (index > 0 && !page.isTab) href = `${page.slug}/${tab}`;
            if (index > 0 && page.isTab)
              href = `${(href = page.slug
                .split("/")
                .slice(0, -1)
                .join("/"))}/${tab}`;

            return (
              <Link key={tab} href={href}>
                {tab}
              </Link>
            );
          })}
        </div>
      )}
    </div>
  );
}
