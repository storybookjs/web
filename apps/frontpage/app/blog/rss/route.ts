import RSS from 'rss';
import { client } from '../../../lib/sanity/client';
import { Post } from '../page';

export async function GET() {
  const posts = await client.fetch<
    Post[]
  >(`*[_type == "post"] | order(publishedAt desc) {
    ...,
    authors[]->,
    tags[]->
  }`);

  const feedOptions = {
    title: 'Storybook RSS feed',
    site_url: 'https://storybook.js.org',
    feed_url: 'https://storybook.js.org/blog/rss',
    pubDate: new Date(),
  };
  const feed = new RSS(feedOptions);

  posts.forEach((post) => {
    feed.item({
      title: post.title || 'Untitled',
      url: `https//storybook.js.org/blog/${post.slug}`,
      date: post._createdAt,
      description: post?.subtitle || 'No description',
    });
  });

  return new Response(feed.xml({ indent: true }), {
    headers: {
      'Content-Type': 'application/xml; charset=utf-8',
    },
  });
}
