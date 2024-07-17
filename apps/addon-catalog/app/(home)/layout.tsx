import { type ReactNode } from 'react';
import { HomeWrapper } from '../../components/home-wrapper';
import { buildTagLinks } from '../../lib/build-tag-links';
import { fetchHomeData } from '../../lib/fetch-home-data';

export default async function Layout({ children }: { children: ReactNode }) {
  const { trendingTags = [] } = (await fetchHomeData()) || {};
  const tagLinks = buildTagLinks(trendingTags);

  return <HomeWrapper tagLinks={tagLinks}>{children}</HomeWrapper>;
}
