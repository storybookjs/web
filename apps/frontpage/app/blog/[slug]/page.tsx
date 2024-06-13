import { notFound } from 'next/navigation';
import { client, urlFor } from '../../../lib/sanity/client';
import { Post } from '../page';
import Image from 'next/image';

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

  const img = post.mainImage;
  const imageUrl = img && urlFor(img).url();
  const blurUrl = img && urlFor(img).width(20).quality(20).url();

  return (
    <div className="mx-auto max-w-[800px] pb-20 pt-20">
      <div className="relative mb-8 h-96 w-full overflow-hidden rounded-xl">
        {imageUrl && blurUrl && (
          <Image
            src={imageUrl}
            alt="My Image"
            fill={true}
            placeholder="blur"
            blurDataURL={blurUrl}
            className="object-cover"
          />
        )}
      </div>
      <h1 className="mb-4 text-4xl">{post.title}</h1>
      <div className="text-lg text-zinc-500">{post.subtitle}</div>
    </div>
  );
}
