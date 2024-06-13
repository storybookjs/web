import Link from 'next/link';
import { client, urlFor } from '../../lib/sanity/client';
import Image from 'next/image';
import { SanityImageSource } from '@sanity/image-url/lib/types/types';

export type Post = {
  _id: string;
  title?: string;
  subtitle?: string;
  slug?: {
    current: string;
  };
  mainImage?: SanityImageSource;
};

export default async function Page() {
  const posts = await client.fetch<Post[]>(`*[_type == "post"]`);

  return (
    <div className="w-full flex-1 py-12 pt-24">
      <h1 className="mb-16 text-4xl font-bold">
        News and updates from the team
      </h1>
      <div className="flex gap-8">
        {posts.slice(0, 2).map((post) => {
          const img = post.mainImage;
          const imageUrl = img && urlFor(img).url();
          const blurUrl = img && urlFor(img).width(20).quality(20).url();
          const url = `/blog/${post?.slug?.current}`;

          return (
            <div key={post._id} className="mb-8 w-full">
              {imageUrl && blurUrl && (
                <Link
                  href={url}
                  className="relative mb-4 block h-96 w-full overflow-hidden rounded-xl"
                >
                  <Image
                    src={imageUrl}
                    alt="My Image"
                    fill={true}
                    placeholder="blur"
                    blurDataURL={blurUrl}
                    className="object-cover"
                  />
                </Link>
              )}
              <Link href={url} className="text-xl">
                {post?.title}
              </Link>
              <div className="mt-1 text-zinc-500">{post?.subtitle}</div>
            </div>
          );
        })}
      </div>
      {posts.slice(2).map((post) => {
        const img = post.mainImage;
        const imageUrl = img && urlFor(img).url();
        const blurUrl = img && urlFor(img).width(20).quality(20).url();
        const url = `/blog/${post?.slug?.current}`;

        return (
          <div key={post._id} className="mb-8 flex w-full items-center gap-8">
            {imageUrl && blurUrl && (
              <Link
                href={url}
                className="relative block h-32 w-56 overflow-hidden rounded-xl"
              >
                <Image
                  src={imageUrl}
                  alt="My Image"
                  fill={true}
                  placeholder="blur"
                  blurDataURL={blurUrl}
                  className="object-cover"
                />
              </Link>
            )}
            <div>
              <Link href={url} className="text-xl">
                {post?.title}
              </Link>
              <div className="mt-1 text-zinc-500">{post?.subtitle}</div>
            </div>
          </div>
        );
      })}
    </div>
  );
}
