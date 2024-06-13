import Link from 'next/link';
import { client } from '../../lib/sanity/client';

type Post = {
  _id: string;
  title?: string;
  slug?: {
    current: string;
  };
};

export default async function Page() {
  const posts = await client.fetch<Post[]>(`*[_type == "post"]`);

  return (
    <div className="w-full flex-1 py-12">
      {posts.map((post) => (
        <Link key={post._id} href={`/blog/${post?.slug?.current}`}>
          {post?.title}
        </Link>
      ))}
    </div>
  );
}
