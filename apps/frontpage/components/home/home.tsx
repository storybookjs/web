'use client';

import { Header, Footer, Container } from '@repo/ui';
import { useMemo, useRef } from 'react';
import { useInView } from 'framer-motion';
import { Hero } from './hero';
import { Develop } from './develop/develop';
import { Generate } from './generate/generate';
import { StickyNav } from './sticky-nav/sticky-nav';
import { Test } from './test/test';
import { Review } from './review/review';
import { Share } from './share/share';
import { Automate } from './automate/automate';
import { SocialValidation } from './social-validation/social-validation';

// Keeps a section's top clear of the sticky nav when jumping to its anchor
const sectionClassName = 'scroll-mt-10 md:scroll-mt-18';

// useInView margin that shrinks the viewport to a thin line 30% from the top,
// so the highlighted section is the one under that line, however short it is
const navLine = '-30% 0px -69% 0px';

interface HomeProps {
  githubCount: number;
  npmDownloads: string;
  contributorCount: string;
  discordMembers: string;
}

export function Home({
  githubCount,
  npmDownloads,
  contributorCount,
  discordMembers,
}: HomeProps) {
  // Context sets the nav's visibility, so it only counts once its top
  // reaches the top 10% of the viewport (the hero has scrolled away). That
  // band is deeper than the scroll margin, so jumping to #context keeps the nav
  const contextRef = useRef(null);
  const contextInView = useInView(contextRef, { margin: '0px 0px -90% 0px' });

  // Every other section is active while it crosses the nav line
  const agentsRef = useRef(null);
  const agentsInView = useInView(agentsRef, { margin: navLine });

  const verifyRef = useRef(null);
  const verifyInView = useInView(verifyRef, { margin: navLine });

  const reviewRef = useRef(null);
  const reviewInView = useInView(reviewRef, { margin: navLine });

  const shareRef = useRef(null);
  const shareInView = useInView(shareRef, { margin: navLine });

  const automateRef = useRef(null);
  const automateInView = useInView(automateRef, { margin: navLine });

  const whoRef = useRef(null);
  const whoInView = useInView(whoRef, { margin: navLine });

  const activeSection = useMemo(() => {
    if (whoInView) return 'who';
    if (automateInView) return 'automate';
    if (shareInView) return 'share';
    if (reviewInView) return 'review';
    if (verifyInView) return 'verify';
    if (agentsInView) return 'agents';
    if (contextInView) return 'context';
    return null;
  }, [
    contextInView,
    agentsInView,
    verifyInView,
    reviewInView,
    shareInView,
    automateInView,
    whoInView,
  ]);

  return (
    <div className="bg-homeBackground relative" id="page-top">
      <div className="relative z-10">
        <Header
          algoliaApiKey={process.env.NEXT_PUBLIC_ALGOLIA_API_KEY!}
          githubCount={githubCount}
          variant="home"
        />
        <Hero contributorCount={contributorCount} npmDownloads={npmDownloads} />
        <StickyNav
          activeSection={activeSection}
          isVisible={Boolean(activeSection)}
        />
        <div
          className={sectionClassName}
          id="context"
          ref={contextRef}
          style={{ contain: 'paint' }}
        >
          <Develop />
        </div>
        {/* The /ai redirect and the hero "See how" link point to #agents */}
        <div className={sectionClassName} id="agents" ref={agentsRef}>
          <Generate />
        </div>
        <div className={sectionClassName} id="verify" ref={verifyRef}>
          <Test />
        </div>
        <div className={sectionClassName} id="review" ref={reviewRef}>
          <Review />
        </div>
        <div className={sectionClassName} id="share" ref={shareRef}>
          <Share />
        </div>
        <div
          className={sectionClassName}
          id="automate"
          ref={automateRef}
          style={{ contain: 'paint' }}
        >
          <Automate />
        </div>
        <div className={sectionClassName} id="who" ref={whoRef}>
          <SocialValidation
            contributorCount={contributorCount}
            discordMembers={discordMembers}
          />
        </div>
        <Footer variant="home" />
      </div>

      {/* Background circles and texture */}
      <div className="absolute left-0 top-0 z-0 h-full w-full overflow-hidden">
        <Container className="relative h-full">
          <div className="absolute left-[-160px] top-[-300px] z-[2] h-[500px] w-[500px] rounded-full bg-[radial-gradient(closest-side_at_50%_50%,_rgba(255,71,133,1),_rgba(255,71,133,0)),url('/home/texture.svg')] min-[600px]:h-[700px] min-[600px]:w-[700px] min-[960px]:left-[-100px] min-[960px]:top-[-500px] min-[960px]:h-[928px] min-[960px]:w-[928px] min-[1440px]:left-[-20%] min-[1440px]:top-[-720px] min-[1440px]:h-[1400px] min-[1440px]:w-[1400px]" />

          <div className="absolute left-[200px] top-[-220px] z-[1] h-[400px] w-[400px] rounded-full bg-[radial-gradient(closest-side_at_50%_50%,_rgba(252,81,31,1),_rgba(252,81,31,0)),url('/home/texture.svg')] opacity-80 min-[600px]:left-[360px] min-[600px]:top-[-260px] min-[600px]:h-[600px] min-[600px]:w-[600px] min-[960px]:left-[480px] min-[960px]:top-[-420px] min-[960px]:h-[900px] min-[960px]:w-[900px] min-[1440px]:left-[34%]" />

          <div className="absolute right-[200px] top-[160px] z-[1] h-[600px] w-[600px] rounded-full bg-[radial-gradient(closest-side_at_50%_50%,_rgba(71,145,255,1),_rgba(252,81,31,0)),url('/home/texture.svg')] opacity-90 min-[600px]:right-[400px] min-[600px]:top-[220px] min-[960px]:right-[0px] min-[960px]:top-[260px] min-[960px]:h-[1400px] min-[960px]:w-[1400px] min-[1440px]:right-[-16%]" />
        </Container>
      </div>
    </div>
  );
}
