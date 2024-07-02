import RSS from 'rss';
import { client } from '../../../lib/sanity/client';
import { Post } from '../page';
import { NextRequest } from 'next/server';

export async function GET(req: NextRequest) {
  const url = new URL(req.url);
  const posts = await client.fetch<
    Post[]
  >(`*[_type == "post"] | order(publishedAt desc) {
    ...,
    authors[]->,
    tags[]->
  }`);

  const feedOptions = {
    title: 'Storybook RSS feed',
    site_url: url.origin,
    feed_url: url.href,
    pubDate: new Date(),
  };
  const feed = new RSS(feedOptions);

  posts.forEach((post) => {
    feed.item({
      title: post.title || 'Untitled',
      url: `${url.origin}/blog/${post.slug}`,
      date: post._createdAt,
      description: post?.subtitle || 'No description',
      author: post.authors?.map((author) => author.name).join(', '),
    });
  });

  return new Response(feed.xml({ indent: true }), {
    headers: {
      'Content-Type': 'application/xml; charset=utf-8',
    },
  });
}
