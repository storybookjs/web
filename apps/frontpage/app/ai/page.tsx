import type { Metadata } from 'next';
import { fetchGithubCount } from '@repo/utils';
import { AI } from '../../components/ai/ai';

export function generateMetadata(): Metadata {
  return {
    title: 'Storybook for AI | Storybook',
    description:
      'Storybook gives agents structured UI context and test feedback. Components, props, stories, and docs define what agents can build.',
  };
}

export default async function Page() {
  const { number: githubCount } = await fetchGithubCount();

  return <AI githubCount={githubCount} />;
}
