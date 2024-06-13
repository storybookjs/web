import { notFound } from 'next/navigation';
import { client } from '../../../lib/sanity/client';
import { Post } from '../page';

interface PageProps {
  params: {
    slug: string[];
  };
}

export const generateStaticParams = () => {
  const result: { slug: string[] }[] = [];

  return result;
};

export default async function Page({ params: { slug } }: PageProps) {
  const post = await client.fetch<Post>(
    `*[_type == "post" && slug.current == $slug][0]`,
    { slug },
  );

  if (!post) notFound();

  return <div className="">{post.title}</div>;
}
