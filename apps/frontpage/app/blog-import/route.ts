import ghostFile from './storybook-blog.ghost.2024-06-30-10-35-44.json';

export async function POST() {
  return Response.json(ghostFile);
}
