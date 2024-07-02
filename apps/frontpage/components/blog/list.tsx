'use client';

import Link from 'next/link';
import { client, urlFor } from '../../lib/sanity/client';
import Image from 'next/image';
import { cn } from '@repo/utils';
import { format, parseISO } from 'date-fns';
import { CloseIcon, SearchIcon } from '@storybook/icons';
import { ReactNode, useEffect, useState } from 'react';
import { Post, Tag } from '../../app/blog/page';
import { QueryParams } from 'next-sanity';

export const List = ({
  posts,
  tags,
}: {
  posts: Post[];
  tags: Tag[];
}): ReactNode => {
  const [search, setSearch] = useState('');
  const [loading, setLoading] = useState(true);
  const [searchResults, setSearchResults] = useState<Post[]>(posts.slice(2));

  useEffect(() => {
    setLoading(true);

    const getData = setTimeout(async () => {
      if (search.length > 1) {
        const params: QueryParams = { searchQuery: search };
        const data = await client.fetch<Post[]>(
          `*[_type == "post" && !(_id in path("drafts.**")) && title match [$searchQuery + '*']] | order(publishedAt desc) {
        ...,
        authors[]->,
        tags[]->
      }`,
          params,
        );
        console.log(data);
        setLoading(false);
        setSearchResults(data);
      }
      if (search.length === 0) {
        setLoading(false);
        setSearchResults(posts.slice(2));
      }
    }, 600);

    return () => clearTimeout(getData);
  }, [search]);

  return (
    <>
      <div className="flex items-center justify-between py-8 mb-12 border-t border-b border-zinc-200">
        <div className="flex gap-2">
          <Link
            href="/blog"
            className={cn(
              'flex h-8 items-center rounded border border-zinc-200 px-3 text-sm text-slate-800',
              true && 'border-blue-500 bg-blue-100 font-bold text-blue-500',
            )}
          >
            Most recent
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
        <div className="relative flex h-10 w-full flex-shrink-0 items-center rounded-full border border-zinc-300 md:w-[250px] dark:border-slate-700">
          <SearchIcon className="absolute left-4 dark:text-slate-500" />
          <input
            className="w-full h-full pl-10 bg-transparent rounded-full placeholder:text-slate-500 dark:placeholder:text-slate-400"
            placeholder="Search blog"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
          {search.length > 0 && (
            <div
              className="absolute flex items-center justify-center -translate-y-1/2 cursor-pointer right-2 top-1/2 h-7 w-7"
              onClick={() => setSearch('')}
            >
              <CloseIcon />
            </div>
          )}
        </div>
      </div>
      {loading && <div>Loading...</div>}
      {!loading &&
        searchResults.map((post) => {
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
                      <div
                        key={author.name}
                        className="relative w-6 h-6 -ml-2 overflow-hidden rounded-full bg-slate-100"
                      >
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
    </>
  );
};
