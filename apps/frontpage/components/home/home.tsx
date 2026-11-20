'use client';

import { Header, Footer, Container } from '@repo/ui';
import { useMemo, useRef } from 'react';
import { useInView } from 'framer-motion';
import { Hero } from './hero';
import { Agents } from './agents/agents';
import { Develop } from './develop/develop';
import { StickyNav } from './sticky-nav/sticky-nav';
import { Test } from './test/test';
import { Document } from './document/document';
import { Review } from './review/review';
import { Share } from './share/share';
import { Automate } from './automate/automate';
import { SocialValidation } from './social-validation/social-validation';

// Keeps a section's top clear of the sticky nav when jumping to its anchor
const sectionClassName = 'scroll-mt-10 md:scroll-mt-18';

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
  const developRef = useRef(null);
  const developInView = useInView(developRef, { margin: '0px 0px -100% 0px' });

  const agentsRef = useRef(null);
  const agentsInView = useInView(agentsRef);

  // Agents is shorter than most viewports, so Test only takes over once its
  // top reaches the upper half of the viewport; otherwise Agents never highlights
  const testRef = useRef(null);
  const testInView = useInView(testRef, { margin: '0px 0px -50% 0px' });

  const documentRef = useRef(null);
  const documentInView = useInView(documentRef);

  const reviewRef = useRef(null);
  const reviewInView = useInView(reviewRef);

  const shareRef = useRef(null);
  const shareInView = useInView(shareRef);

  const automateRef = useRef(null);
  const automateInView = useInView(automateRef);

  const whoRef = useRef(null);
  const whoInView = useInView(whoRef);

  const activeSection = useMemo(() => {
    if (whoInView) return 'who';
    if (automateInView) return 'automate';
    if (shareInView) return 'share';
    if (reviewInView) return 'review';
    if (documentInView) return 'document';
    if (testInView) return 'test';
    if (agentsInView) return 'agents';
    if (developInView) return 'develop';
    return null;
  }, [
    developInView,
    testInView,
    documentInView,
    reviewInView,
    agentsInView,
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
          id="develop"
          ref={developRef}
          style={{ contain: 'paint' }}
        >
          <Develop />
        </div>
        {/* Keep the #agents anchor: the /ai redirect and the hero link point to it */}
        <div className={sectionClassName} id="agents" ref={agentsRef}>
          <Agents />
        </div>
        <div className={sectionClassName} id="test" ref={testRef}>
          <Test />
        </div>
        <div className={sectionClassName} id="document" ref={documentRef}>
          <Document />
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
