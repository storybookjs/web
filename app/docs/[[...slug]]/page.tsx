import { getVersion } from "@/lib/get-version";
import * as MDX from "@/components/mdx";
import { notFound } from "next/navigation";
import Link from "next/link";
import { cn } from "@/lib/utils";
import { renderers } from "@/docs-renderers";
import { getPageData } from "@/lib/get-page";
import { docsVersions } from "@/docs-versions";
import { getMDXComponent } from "mdx-bundler/client";
import { cookies } from "next/headers";
import { Renderers } from "@/components/docs/renderers";

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
  const cookieStore = cookies();
  const rendererCookie = cookieStore.get("sb-docs-renderer");
  const activeRenderer = rendererCookie
    ? rendererCookie.value
    : renderers[0].id;

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
      <MDX.H1>{page.title || "Title is missing"}</MDX.H1>
      <Renderers activeRenderer={activeRenderer} />
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
            h1: MDX.H1,
            h2: MDX.H2,
            h3: MDX.H3,
            h4: MDX.H1,
            a: MDX.A,
            p: MDX.P,
            hr: MDX.Hr,
            ul: MDX.UnorderedList,
            li: MDX.List,
            pre: MDX.Pre,
            img: (props: any) => (
              <MDX.ImgDocs activeVersion={activeVersion} {...props} />
            ),
            CodeSnippets: MDX.CodeSnippets,
            Callout: MDX.Callout,
            IfRenderer: MDX.IfRenderer,
            YouTubeCallout: MDX.YouTubeCallout,
            FeatureSnippets: MDX.FeatureSnippets,
          }}
        />
      </article>
    </div>
  );
}
