import { Header, Footer, Container, NewsletterForm } from '@repo/ui';
import {
  fetchDiscordMembers,
  fetchGithubCount,
  fetchNpmDownloads,
  fetchYouTubeSubscribers,
} from '@repo/utils';
import { NavTop } from '../../components/community/nav-top';
import { Community } from '../../components/community';
import { Numbers } from '../../components/community/numbers';
import { NavSide } from '../../components/community/nav-side';
import { Support } from '../../components/community/support';
import { Events } from '../../components/community/events';
import { BrandAndResources } from '../../components/community/brand';
import { Team } from '../../components/community/team';
import { Contribute } from '../../components/community/contribute';
import { Sponsor } from '../../components/community/sponsor';
import { Testimonials } from '../../components/community/testimonials';
import { CommunityProvider } from './provider';

export default async function Page() {
  const { number: githubCount, formattedResult: githubCountFormatted } =
    await fetchGithubCount();
  // const { formattedResult: contributors } = await fetchGithubContributorCount();
  const { formattedResult: discordMembers } = await fetchDiscordMembers();
  const { formattedResult: npmDownloads } = await fetchNpmDownloads();
  const { formattedResult: youtubeSubscribers } =
    await fetchYouTubeSubscribers();

  return (
    <CommunityProvider>
      <Header
        algoliaApiKey={process.env.NEXT_PUBLIC_ALGOLIA_API_KEY!}
        githubCount={githubCount}
      />
      <NavTop />
      <Container asChild className="mt-10 md:mt-20" variant="small">
        <main>
          <div className="justify-between gap-20 mb-10 md:mb-16 md:flex lg:px-8">
            <h2 className="flex-1 text-4xl font-bold md:text-[56px]/[70px]">
              Meet world-class frontend devs
            </h2>
            <div className="flex-1 pt-4">
              <p className="mb-6 leading-7">
                Storybook is one of the fastest growing frontend communities.
                Join thousands fellow developers leveling up their skills
                together.
              </p>
              <div className="flex items-center gap-8">
                <NewsletterForm />
              </div>
            </div>
          </div>
          <Community />
          <Numbers
            githubCount={githubCountFormatted}
            contributorsCount="2282"
            discordMembersCount={discordMembers}
            npmDownloadsCount={npmDownloads}
            youtubeSubscribersCount={youtubeSubscribers}
          />
          <div className="flex gap-16 pb-20 mb-20 border-b border-b-zinc-300 dark:border-b-slate-700">
            <NavSide />
            <div className="flex-1">
              <Support />
              <Events />
              <BrandAndResources />
              <Team />
              <Contribute />
              <Sponsor />
            </div>
          </div>
          <Testimonials />
        </main>
      </Container>
      <Footer />
    </CommunityProvider>
  );
}
