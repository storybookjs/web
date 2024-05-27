import { Header, Footer, Container, NewsletterForm } from '@repo/ui';
import { fetchGithubCount } from '@repo/utils';
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
  const { number: githubCount } = await fetchGithubCount();

  return (
    <CommunityProvider>
      <Header githubCount={githubCount} variant="system" />
      <NavTop />
      <Container asChild className="mt-10 md:mt-20" variant="small">
        <main>
          <div className="justify-between gap-20 mb-10 lg:px-8 md:flex md:mb-16">
            <h2 className="flex-1 text-4xl md:text-[56px]/[70px] font-bold">
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
          <Numbers />
          <div className="flex gap-16 pb-20 mb-20 border-b border-b-zinc-300">
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
