import Link from 'next/link';
import { client, urlFor } from '../../lib/sanity/client';
import Image from 'next/image';
import { SanityImageSource } from '@sanity/image-url/lib/types/types';
import { cn } from '@repo/utils';
import { format, parseISO } from 'date-fns';
import { PortableTextBlock } from 'next-sanity';
import { RSSIcon, SearchIcon } from '@storybook/icons';
import { List } from '../../components/blog/list';

export type Post = {
  _id: string;
  _updatedAt: string;
  _createdAt: string;
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
      <div className="flex justify-between mb-16">
        <h1 className="text-4xl font-bold">News and updates from the team</h1>
        <a
          className="items-center justify-center hidden w-12 h-12 transition-all bg-white border rounded-full border-zinc-200 hover:-translate-y-1 hover:border-zinc-400 md:flex dark:border-slate-700 dark:bg-slate-900 dark:hover:border-slate-500"
          href="/blog/rss"
          rel="noreferrer"
          target="_blank"
        >
          <RSSIcon size={18} />
        </a>
      </div>
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
      <List posts={posts} tags={tags} />
    </div>
  );
}
