import { ReleaseNewsletter } from "@/components2/release-newsletter";
import { getRelease } from "@/lib/get-release";
import { getReleases } from "@/lib/get-releases";
import { notFound } from "next/navigation";

interface Props {
  params: {
    slug: string;
  };
}

export const generateStaticParams = async () => {
  return getReleases().map((release) => ({
    slug: release,
  }));
};

export default async function Home({ params: { slug } }: Props) {
  const releases = getReleases();

  // TODO: This is not really working on prod
  if (releases.includes(slug) === false) return notFound();

  const page = await getRelease(slug);

  return (
    <article className="w-full max-w-4xl mx-auto px-4 lg:px-8 my-10">
      <h1 className="text-4xl mt-0 mb-6 font-bold">
        {page?.frontmatter.title || "Page Not Found"}
      </h1>
      {page?.content}
      <ReleaseNewsletter />
    </article>
  );
}
