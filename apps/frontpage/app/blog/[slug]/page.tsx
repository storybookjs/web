import { notFound } from 'next/navigation';
import { client, urlFor } from '../../../lib/sanity/client';
import { Post } from '../page';
import Image from 'next/image';
import { format, parseISO } from 'date-fns';
import Body from '../../../components/blog/body';
import { NewsletterForm, SubHeader } from '@repo/ui';
import { CopyIcon, XIcon } from '@storybook/icons';

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

export default async function Page({ params: { slug } }: PageProps) {
  const post = await client.fetch<Post>(
    `*[_type == "post" && slug.current == $slug][0]{
      ...,
      authors[]->,
      tags[]->,
      'prev': *[_type == 'post' && !(_id in path('drafts.**')) && _createdAt < ^._createdAt]._id | order(_createdAt desc)[0],
      'next': *[_type == 'post' && !(_id in path('drafts.**')) && _createdAt > ^._createdAt]._id | order(_createdAt desc)[0]
    }`,
    { slug },
  );

  if (!post) notFound();

  const img = post.mainImage;
  const imageUrl = img && urlFor(img).url();
  const blurUrl = img && urlFor(img).width(20).quality(20).url();

  console.log(post);

  return (
    <>
      <SubHeader
        leftLabel="Back to blog"
        leftHref="/blog"
        right={<div>Join the community</div>}
      />
      <div className="mx-auto max-w-[1024px] pb-20">
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
          <div className="text-zinc-500">
            {post.publishedAt &&
              format(parseISO(post.publishedAt), 'MMMM dd, yyyy')}
          </div>
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
          <div className="pb-16 my-16 border-b border-zinc-200">
            <div className="font-bold text-md">
              Join the Storybook mailing list
            </div>
            <div className="mb-4">
              Get the latest news, updates and releases
            </div>
            <NewsletterForm />
          </div>
          <div className="sticky z-50 flex items-center justify-center gap-4 bottom-10">
            <button className="flex items-center justify-center h-10 gap-2 px-6 font-bold text-black transition-colors border rounded-full cursor-pointer border-zinc-200 bg-white/80 backdrop-blur hover:border-blue-500 hover:text-blue-500">
              Share on
              <XIcon />
            </button>
            <button className="flex items-center justify-center h-10 gap-2 px-6 font-bold text-black border rounded-full cursor-pointertransition-colors border-zinc-200 bg-white/80 backdrop-blur hover:border-blue-500 hover:text-blue-500">
              Copy link
              <CopyIcon />
            </button>
          </div>
        </div>
        <div className="mt-16 border-t border-zinc-200">Hello</div>
      </div>
    </>
  );
}
