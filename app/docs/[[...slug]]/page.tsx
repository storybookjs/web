import { getVersion } from "@/lib/get-version";
import { H1 } from "@/components/mdx";
import { notFound } from "next/navigation";
import Link from "next/link";
import { getAllPages } from "@/lib/get-all-pages";
import { cn } from "@/lib/utils";
import { findPage } from "@/lib/find-page";
import { renderers } from "@/docs-renderers";

export async function generateMetadata({
  params: { slug },
}: {
  params: {
    slug: string[];
  };
}) {
  const activeVersion = getVersion(slug);
  const allPages = await getAllPages(activeVersion.id);
  const page = await findPage(allPages, slug, activeVersion.id);

  if (!page) {
    return {
      title: "Page Not Found",
    };
  }

  return {
    title: `${page.title} • Storybook docs` || "Storybook • Storybook docs",
  };
}

export default async function Page({ params }: { params: { slug: string[] } }) {
  const active = "react";

  // Get the latest version
  const activeVersion = getVersion(params.slug);

  // Get all pages in a flat list
  const allPages = await getAllPages(activeVersion.id);
  const page = await findPage(allPages, params.slug, activeVersion.id);

  if (!page) notFound();

  return (
    <div>
      <H1>{page.title || "Title is missing"}</H1>
      <div className="flex gap-2 mb-8">
        {renderers.slice(0, 4).map((renderer) => (
          <button
            className={cn(
              "inline-flex items-center justify-center h-7 rounded border border-zinc-300 text-sm px-2 hover:border-blue-500 transition-colors text-zinc-800 hover:text-blue-500",
              renderer.id === active && "border-blue-500 text-blue-500"
            )}
            key={renderer.id}
          >
            {renderer.title}
          </button>
        ))}
      </div>
      {page.tabs && page.tabs.length > 0 && (
        <div className="flex items-center gap-8 border-b border-zinc-200">
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
            const isActive = href === page.slug;

            return (
              <Link
                key={tab}
                href={href}
                className={cn(
                  "border-b -mb-px pb-2 hover:text-blue-500 transition-colors px-2 text-sm capitalize",
                  isActive && "border-b border-blue-500 text-blue-500"
                )}
              >
                {index === 0 ? "Guide" : tab}
              </Link>
            );
          })}
        </div>
      )}
    </div>
  );
}
