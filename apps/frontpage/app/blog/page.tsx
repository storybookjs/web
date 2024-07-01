import Link from 'next/link';
import { client, urlFor } from '../../lib/sanity/client';
import Image from 'next/image';
import { SanityImageSource } from '@sanity/image-url/lib/types/types';
import { cn } from '@repo/utils';
import { format, parseISO } from 'date-fns';
import { PortableTextBlock } from 'next-sanity';

export type Post = {
  _id: string;
  _updatedAt: string;
  title?: string;
  subtitle?: string;
  slug?: {
    current: string;
  };
  mainImage?: SanityImageSource;
  authors?: {
    name: string;
    image?: SanityImageSource;
    twitter?: string;
  }[];
  tags?: {
    _id: string;
    name: string;
    slug?: {
      current: string;
    };
  }[];
  publishedAt?: string;
  body?: PortableTextBlock[];
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
    <div className="flex-1 w-full py-12 pt-24">
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
            <div key={post._id} className="w-full mb-12">
              {imageUrl && blurUrl && (
                <Link
                  href={url}
                  className="relative block w-full mb-4 overflow-hidden h-96 rounded-xl"
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
              <div className="mt-1 mb-4 text-zinc-500">{post?.subtitle}</div>
              <div className="flex gap-8">
                <div className="flex items-center gap-4">
                  <div className="flex items-center">
                    {post.authors?.map((author) => {
                      const img = author.image;
                      const imageUrl = img && urlFor(img).url();
                      return (
                        <div className="relative w-8 h-8 -ml-2 overflow-hidden rounded-full bg-slate-100">
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
      <div className="py-8 mb-12 border-t border-b border-zinc-200">
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
                className="flex items-center h-8 px-3 text-sm border rounded border-zinc-200 text-slate-800"
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
            <div className="relative z-10 flex items-center w-full gap-8">
              <div className="relative flex-shrink-0 block h-16 overflow-hidden rounded-lg w-28">
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
              <div className="basis-3/4">
                <div className="text-xl">{post?.title}</div>
                <div className="mt-1 text-zinc-500">{post?.subtitle}</div>
              </div>
              <div className="basis-1/4 text-zinc-500">
                {post?.tags?.[0].name}
              </div>
              <div className="basis-1/4 text-zinc-500">
                {post.publishedAt &&
                  format(parseISO(post.publishedAt), 'MMMM dd, yyyy')}
              </div>
              <div className="flex flex-row justify-end flex-shrink-0 w-20">
                {post.authors?.map((author) => {
                  const img = author.image;
                  const imageUrl = img && urlFor(img).url();
                  return (
                    <div className="relative w-6 h-6 -ml-2 overflow-hidden rounded-full bg-slate-100">
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
