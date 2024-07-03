import { notFound } from 'next/navigation';
import { client, urlFor } from '../../../lib/sanity/client';
import { Post } from '../page';
import Image from 'next/image';
import { format, parseISO } from 'date-fns';
import Body from '../../../components/blog/body';
import { NewsletterForm, Pill, SubHeader } from '@repo/ui';
import { DiscordIcon, GithubIcon, XIcon, YoutubeIcon } from '@storybook/icons';
import Link from 'next/link';
import CopyButton from '../../../components/blog/copy-button';

interface PageProps {
  params: {
    slug: string[];
  };
}

export const generateStaticParams = async () => {
  const posts = await client.fetch<Post[]>(`*[_type == "post"] { slug }`);

  const paths = posts.map((post) => ({
    slug: post.slug?.current || '',
  }));

  return paths;
};

interface PostWithPrevNext extends Post {
  prev: Post[];
  next: Post[];
}

export default async function Page({ params: { slug } }: PageProps) {
  const post = await client.fetch<PostWithPrevNext>(
    `*[_type == "post" && slug.current == $slug][0]{
      ...,
      authors[]->,
      tags[]->,
      body[]{..., post-> {
        mainImage,
        title,
        slug,
        subtitle,
        authors[]->
      }},
      'prev': *[_type == 'post' && !(_id in path('drafts.**')) && _createdAt < ^._createdAt]{..., authors[]->} | order(_createdAt desc)[0..2],
      'next': *[_type == 'post' && !(_id in path('drafts.**')) && _createdAt > ^._createdAt]{..., authors[]->} | order(_createdAt desc)[0..2]
    }`,
    { slug },
  );

  if (!post) notFound();

  const img = post.mainImage;
  const imageUrl = img && urlFor(img).url();
  const blurUrl = img && urlFor(img).width(20).quality(20).url();
  const keepReadingPosts = [...post.prev, ...post.next];
  const postUrl = `https://storybook.js.org/blog/${post.slug?.current}`;

  return (
    <>
      <SubHeader
        leftLabel="Back to blog"
        leftHref="/blog"
        right={
          <div className="flex items-center gap-4">
            <span>Join the community</span>
            <div>
              <GithubIcon />
            </div>
            <div>
              <DiscordIcon />
            </div>
            <div>
              <XIcon />
            </div>
            <div>
              <YoutubeIcon />
            </div>
          </div>
        }
      />
      <article className="mx-auto max-w-[1024px]">
        {post?.tags && post.tags.length > 0 && (
          <div className="flex justify-center mb-6">
            <div className="flex items-center justify-center h-8 px-4 text-sm font-bold text-center text-blue-500 uppercase border border-blue-500 rounded-full">
              {post.tags?.[0].name}
            </div>
          </div>
        )}
        <h1 className="mb-4 text-6xl font-bold leading-tight text-center">
          {post.title}
        </h1>
        <div className="mb-6 text-2xl text-center text-zinc-500">
          {post.subtitle}
        </div>
        <div className="flex items-center justify-center w-full gap-6 mb-12">
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
                    <span className="text-zinc-500 first:hidden"> and </span>
                    {author.name}
                  </>
                );
              })}
            </div>
          </div>
          <time className="text-zinc-500">
            {post.publishedAt &&
              format(parseISO(post.publishedAt), 'MMMM dd, yyyy')}
          </time>
        </div>
        <div className="relative mb-8 h-[500px] w-full overflow-hidden rounded-xl">
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
        <div className="relative mx-auto max-w-[640px]">
          {post.body && <Body value={post.body} />}
          <div className="flex flex-col gap-4 py-6 mt-12 border-t border-b border-zinc-200">
            <div className="flex">
              <span className="text-md w-[140px] flex-shrink-0">Tags</span>
              <div className="flex flex-wrap gap-2">
                {post.tags?.map((tag) => (
                  <Pill asChild key={tag._id}>
                    <Link
                      href={`/blog/tag/${tag?.slug?.current}`}
                      className="flex items-center h-8 px-3 text-sm border rounded border-zinc-200 text-slate-800"
                    >
                      {tag.name}
                    </Link>
                  </Pill>
                ))}
              </div>
            </div>
            <div className="flex text-md">
              <span className="w-[140px] flex-shrink-0">Last updated</span>
              <time>
                {post.publishedAt &&
                  format(parseISO(post._updatedAt), 'MMMM dd, yyyy')}
              </time>
            </div>
          </div>
          <div className="sticky z-50 flex items-center justify-center gap-4 mt-12 bottom-10">
            <a
              href={`https://twitter.com/intent/tweet?text=${post.title}%20by%20${post.authors?.[0].twitter}%20${postUrl}`}
              target="_blank"
              rel="noreferrer noopener"
              className="flex items-center justify-center h-10 gap-2 px-6 font-bold text-black transition-colors border rounded-full cursor-pointer border-zinc-200 bg-white/80 backdrop-blur hover:border-blue-500 hover:text-blue-500"
            >
              Share on
              <XIcon />
            </a>
            <CopyButton postUrl={postUrl} />
          </div>
        </div>
      </article>
      <div className="flex flex-col w-full gap-8 my-16 md:flex-row">
        <div className="flex flex-col justify-between flex-1 w-full p-6 border rounded-lg border-zinc-200">
          <div className="flex flex-col gap-1">
            <div className="text-lg font-bold">
              Join the Storybook mailing list
            </div>
            <div className="mb-4">
              Get the latest news, updates and releases
            </div>
          </div>
          <NewsletterForm />
        </div>
        <div className="flex flex-col items-start flex-1 w-full p-6 border rounded-lg border-zinc-200">
          <div className="mb-1 text-lg font-bold">We're hiring!</div>
          <div className="mb-2">
            Join the team behind Storybook and Chromatic. Build tools that are
            used in production by 100s of thousands of developers. Remote-first.
          </div>
          <div className="flex items-center justify-center h-12">
            <a
              href="https://www.chromatic.com/company/jobs"
              className="flex items-center justify-center h-8 gap-2 px-2 text-sm font-bold text-white transition-all duration-300 bg-blue-500 rounded-md whitespace-nowrap ring-offset-white hover:bg-blue-600 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-700 focus-visible:ring-offset-2 dark:ring-offset-slate-950 dark:focus-visible:ring-slate-300"
            >
              View jobs
            </a>
          </div>
        </div>
      </div>
      <div className="pb-16 mt-16">
        <div className="mb-8 text-3xl font-bold">Keep reading</div>
        <div className="flex flex-col gap-8 md:flex-row">
          {keepReadingPosts &&
            keepReadingPosts.slice(0, 3).map((post) => {
              const img = post.mainImage;
              const imageUrl = img && urlFor(img).url();
              const blurUrl = img && urlFor(img).width(20).quality(20).url();
              const url = `/blog/${post?.slug?.current}`;

              return (
                <div
                  key={post._id}
                  className="flex-1 last:hidden lg:last:block"
                >
                  {imageUrl && blurUrl && (
                    <Link
                      href={url}
                      className="relative block w-full h-56 mb-4 overflow-hidden rounded-lg"
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
                  <div className="mt-1 mb-4 text-zinc-500">
                    {post?.subtitle}
                  </div>
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
