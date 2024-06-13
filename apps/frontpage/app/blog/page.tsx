import Link from 'next/link';
import { client, urlFor } from '../../lib/sanity/client';
import Image from 'next/image';
import { SanityImageSource } from '@sanity/image-url/lib/types/types';
import { cn } from '@repo/utils';
import { format, parseISO } from 'date-fns';

export type Post = {
  _id: string;
  title?: string;
  subtitle?: string;
  slug?: {
    current: string;
  };
  mainImage?: SanityImageSource;
  authors?: {
    name: string;
    image?: SanityImageSource;
  }[];
  tags?: {
    name: string;
    slug?: {
      current: string;
    };
  }[];
  publishedAt?: string;
};

export type Tag = {
  _id: string;
  name?: string;
  slug?: {
    current: string;
  };
};

export default async function Page() {
  const posts = await client.fetch<
    Post[]
  >(`*[_type == "post"] | order(publishedAt desc) {
    ...,
    authors[]->,
    tags[]->
  }`);

  const tags = await client.fetch<Tag[]>(`*[_type == "tag"]`);

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
            <div key={post._id} className="mb-12 w-full">
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
              <div className="mb-4 mt-1 text-zinc-500">{post?.subtitle}</div>
              <div className="flex gap-8">
                <div className="flex items-center gap-4">
                  <div className="flex items-center">
                    {post.authors?.map((author) => {
                      const img = author.image;
                      const imageUrl = img && urlFor(img).url();
                      return (
                        <div className="relative -ml-2 h-8 w-8 overflow-hidden rounded-full bg-slate-100">
                          {imageUrl && (
                            <Image
                              src={imageUrl}
                              alt="My Image"
                              fill={true}
                              className="object-cover"
                            />
                          )}
                        </div>
                      );
                    })}
                  </div>
                  <div>
                    {post.authors?.map((author) => {
                      return (
                        <>
                          <span className="text-zinc-500 first:hidden">
                            {' '}
                            and{' '}
                          </span>
                          {author.name}
                        </>
                      );
                    })}
                  </div>
                </div>
              </div>
            </div>
          );
        })}
      </div>
      <div className="mb-12 border-b border-t border-zinc-200 py-8">
        <div className="flex gap-2">
          <Link
            href="/blog"
            className={cn(
              'flex h-8 items-center rounded border border-zinc-200 px-3 text-sm text-slate-800',
              true && 'border-blue-500 bg-blue-100 font-bold text-blue-500',
            )}
          >
            All
          </Link>
          {tags.slice(0, 6).map((tag) => {
            return (
              <Link
                key={tag._id}
                href={`/blog/tag/${tag?.slug?.current}`}
                className="flex h-8 items-center rounded border border-zinc-200 px-3 text-sm text-slate-800"
              >
                {tag.name}
              </Link>
            );
          })}
        </div>
      </div>
      {posts.slice(2).map((post) => {
        const img = post.mainImage;
        const imageUrl = img && urlFor(img).url();
        const blurUrl = img && urlFor(img).width(20).quality(20).url();
        const url = `/blog/${post?.slug?.current}`;

        return (
          <Link
            href={url}
            key={post._id}
            className="relative mb-8 flex w-full before:absolute before:-left-4 before:-top-4 before:z-0 before:h-[calc(100%+32px)] before:w-[calc(100%+32px)] before:rounded-lg before:bg-zinc-100 before:opacity-0 hover:before:opacity-100"
          >
            <div className="relative z-10 flex w-full items-center gap-8">
              {imageUrl && blurUrl && (
                <div className="relative block h-16 w-28 flex-shrink-0 overflow-hidden rounded-lg">
                  <Image
                    src={imageUrl}
                    alt="My Image"
                    fill={true}
                    placeholder="blur"
                    blurDataURL={blurUrl}
                    className="object-cover"
                  />
                </div>
              )}
              <div className="basis-3/4">
                <Link href={url} className="text-xl">
                  {post?.title}
                </Link>
                <div className="mt-1 text-zinc-500">{post?.subtitle}</div>
              </div>
              <div className="basis-1/4 text-zinc-500">
                {post?.tags?.[0].name}
              </div>
              <div className="basis-1/4 text-zinc-500">
                {post.publishedAt &&
                  format(parseISO(post.publishedAt), 'MMMM dd, yyyy')}
              </div>
              <div className="flex w-20 flex-shrink-0 flex-row justify-end">
                {post.authors?.map((author) => {
                  const img = author.image;
                  const imageUrl = img && urlFor(img).url();
                  return (
                    <div className="relative -ml-2 h-6 w-6 overflow-hidden rounded-full bg-slate-100">
                      {imageUrl && (
                        <Image
                          src={imageUrl}
                          alt="My Image"
                          fill={true}
                          className="object-cover"
                        />
                      )}
                    </div>
                  );
                })}
              </div>
            </div>
          </Link>
        );
      })}
    </div>
  );
}
