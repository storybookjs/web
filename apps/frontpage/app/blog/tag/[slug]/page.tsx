import Link from 'next/link';
import { client, urlFor } from '../../../../lib/sanity/client';
import Image from 'next/image';
import { List } from '../../../../components/blog/list';
import { Post, Tag } from '../../page';
import { SubHeader } from '@repo/ui';

export default async function Page({
  params: { slug },
}: {
  params: { slug: string };
}) {
  const posts = await client.fetch<
    Post[]
  >(`*[_type == "post"] | order(publishedAt desc) {
    ...,
    authors[]->,
    tags[]->
  }`);

  const filteredPosts = posts.filter((post) => {
    return post.tags?.some((tag) => tag.slug?.current === slug);
  });

  const tag = await client.fetch<Tag>(
    `*[_type == "tag" && slug.current == $slug][0] {
    ...,
  }`,
    { slug },
  );

  return (
    <>
      <SubHeader leftLabel="Back to blog" leftHref="/blog" />
      <div className="flex-1 w-full py-12 pt-12">
        <h1 className="mb-16 text-4xl font-bold">{tag.name} articles</h1>
        <div className="grid grid-cols-1 gap-8 md:grid-cols-2 xl:grid-cols-3">
          {filteredPosts.map((post) => {
            const img = post.mainImage;
            const imageUrl = img && urlFor(img).url();
            const blurUrl = img && urlFor(img).width(20).quality(20).url();
            const url = `/blog/${post?.slug?.current}`;

            return (
              <div key={post._id} className="w-full mb-4">
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
      </div>
    </>
  );
}
