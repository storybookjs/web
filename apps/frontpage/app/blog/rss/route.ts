import RSS from 'rss';
// import { SITE_FEED, SITE_NAME, SITE_URL } from "@/lib/constants";
// import { getPosts } from "@/lib/blog/api";

export async function GET() {
  const posts = [];

  const feedOptions = {
    title: 'storybook',
    site_url: 'storybook.js.org',
    feed_url: 'storybook.js.org/rss',
    pubDate: new Date(),
  };
  const feed = new RSS(feedOptions);

  posts.forEach((post) => {
    feed.item({
      title: post.title,
      url: `https//storybook.js.org/${post.slug}`,
      date: post.createdAt,
      description: post?.description,
    });
  });

  return new Response(feed.xml({ indent: true }), {
    headers: {
      'Content-Type': 'application/xml; charset=utf-8',
    },
  });
}
