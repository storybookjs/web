import { getVersion } from "@/lib/get-version";
import {
  A,
  CodeSnippets,
  H1,
  H2,
  H3,
  Hr,
  P,
  UnorderedList,
  List,
  ImgDocs,
  Callout,
  IfRenderer,
  YouTubeCallout,
  FeatureSnippets,
} from "@/components/mdx";
import { notFound } from "next/navigation";
import Link from "next/link";
import { cn } from "@/lib/utils";
import { renderers } from "@/docs-renderers";
import { getPageData } from "@/lib/get-page";
import { docsVersions } from "@/docs-versions";
import { getMDXComponent } from "mdx-bundler/client";

const isHomepage = (slug: string[]) => {
  return (
    slug === undefined ||
    (slug &&
      slug.length === 1 &&
      docsVersions.some((version) => {
        return slug[0] === version.id;
      }))
  );
};

interface Props {
  params: {
    slug: string[];
  };
}

export async function generateMetadata({ params: { slug } }: Props) {
  const activeVersion = getVersion(slug);

  const page = await getPageData(
    isHomepage(slug) ? ["/"] : slug,
    activeVersion.id
  );

  if (!page) {
    return {
      title: "Page Not Found",
    };
  }

  return {
    title: `${page.title} • Storybook docs` || "Storybook • Storybook docs",
  };
}

export default async function Page({ params: { slug } }: Props) {
  const active = "react";

  // Get the latest version
  const activeVersion = getVersion(slug);

  const page = await getPageData(
    isHomepage(slug) ? ["/"] : slug,
    activeVersion.id
  );

  if (!page) notFound();

  const Content = getMDXComponent(page.code);

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
      <article>
        <Content
          components={{
            h1: H1,
            h2: H2,
            h3: H3,
            h4: H1,
            a: A,
            p: P,
            hr: Hr,
            ul: UnorderedList,
            li: List,
            img: (props: any) => (
              <ImgDocs activeVersion={activeVersion} {...props} />
            ),
            CodeSnippets,
            Callout,
            IfRenderer,
            YouTubeCallout,
            FeatureSnippets,
          }}
        />
      </article>
    </div>
  );
}
