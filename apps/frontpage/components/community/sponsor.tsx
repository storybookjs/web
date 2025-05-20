import type { FC } from 'react';
import Image from 'next/image';
import { Button } from '../ui/button';
import { Section } from './section';

export const Sponsor: FC = () => {
  return (
    <Section className="relative" id="sponsor">
      <h2 className="mb-2 text-2xl font-bold">Sponsor the community</h2>
      <p className="mb-8">
        Donations help the community keep going. They are used for web hosting,
        continuous integration, contributor swag, learning materials, and event
        production.
      </p>
      <div className="mb-12 flex">
        <Button asChild rounded="full" variant="solid">
          <a
            href="https://opencollective.com/storybook"
            rel="noreferrer"
            target="_blank"
          >
            Donate on Open Collective
          </a>
        </Button>
      </div>
      <ul className="grid grid-cols-3 gap-4 sm:grid-cols-6 md:grid-cols-8">
        {sponsors.map((sponsor) => (
          <li className="h-12 w-12 flex-shrink-0" key={sponsor.name}>
            <a
              className="relative block h-12 w-12"
              href={sponsor.url}
              rel="noreferrer"
              target="_blank"
            >
              <Image
                alt={sponsor.name}
                className="object-contain"
                fill
                sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                src={sponsor.image}
              />
            </a>
          </li>
        ))}
      </ul>
    </Section>
  );
};

const sponsors = [
  {
    name: 'Airbnb',
    image: 'https://images.opencollective.com/airbnb/d327d66/logo.png',
    url: 'https://opencollective.com/airbnb',
  },
  {
    name: 'Indeed',
    image: 'https://images.opencollective.com/indeed/4b8725e/logo.png',
    url: 'https://opencollective.com/indeed',
  },
  {
    name: 'Applitools: AI-powered Visual Testing and Monitoring',
    image: 'https://images.opencollective.com/applitoolseyes/de8a61f/logo.png',
    url: 'https://opencollective.com/applitoolseyes',
  },
  {
    name: 'Nx (by Nrwl)',
    image: 'https://images.opencollective.com/nx/0efbe42/logo.png',
    url: 'https://opencollective.com/nx',
  },
  {
    name: 'Chromatic',
    image: 'https://images.opencollective.com/chromatic/f73f7dd/logo.png',
    url: 'https://opencollective.com/chromatic',
  },
  {
    name: 'AMP Project',
    image: 'https://images.opencollective.com/amp/9f109bb/logo.png',
    url: 'https://opencollective.com/amp',
  },
  {
    name: 'GitGuardian',
    image: 'https://images.opencollective.com/gitguardian/b428eaa/logo.png',
    url: 'https://opencollective.com/gitguardian',
  },
  {
    name: 'Frontend Masters',
    image: 'https://images.opencollective.com/frontendmasters/0b9cda4/logo.png',
    url: 'https://opencollective.com/frontendmasters',
  },
  {
    name: 'Retool',
    image: 'https://images.opencollective.com/retoolapp1/1c20e97/logo.png',
    url: 'https://opencollective.com/retoolapp1',
  },
  {
    name: 'Turo',
    image: 'https://images.opencollective.com/turo/055f619/logo.png',
    url: 'https://opencollective.com/turo',
  },
  {
    name: 'Strapi',
    image: 'https://images.opencollective.com/strapijs/d5c9a68/logo.png',
    url: 'https://opencollective.com/strapijs',
  },
  {
    name: 'inovex GmbH',
    image: 'https://images.opencollective.com/inovexgmbh/ac5db3d/logo.png',
    url: 'https://opencollective.com/inovexgmbh',
  },
  {
    name: 'Sanity',
    image: 'https://images.opencollective.com/sanity_io/558f87f/logo.png',
    url: 'https://opencollective.com/sanity_io',
  },
  {
    name: 'Meta Open Source',
    image: 'https://images.opencollective.com/fbopensource/e10726f/logo.png',
    url: 'https://opencollective.com/fbopensource',
  },
  {
    name: 'GitBook',
    image: 'https://images.opencollective.com/gitbook/820419f/logo.png',
    url: 'https://opencollective.com/gitbook',
  },
  {
    name: 'Principal Financial Group',
    image: 'https://images.opencollective.com/principal/431e690/logo.png',
    url: 'https://opencollective.com/principal',
  },
  {
    name: 'Sentry',
    image: 'https://images.opencollective.com/sentry/9620d33/logo.png',
    url: 'https://opencollective.com/sentry',
  },
  {
    name: 'Xebia',
    image: 'https://images.opencollective.com/xebia/924d2e1/logo.png',
    url: 'https://opencollective.com/xebia',
  },
  {
    name: 'Work & Co',
    image: 'https://images.opencollective.com/work-and-co/e15f72b/avatar.png',
    url: 'https://opencollective.com/work-and-co',
  },
  {
    name: 'Tipe',
    image: 'https://images.opencollective.com/tipe/b424501/logo.png',
    url: 'https://opencollective.com/tipe',
  },
  {
    name: 'Regina',
    image: 'https://images.opencollective.com/guest-d5004435/avatar.png',
    url: 'https://opencollective.com/guest-d5004435',
  },
  {
    name: 'Marfeel',
    image: 'https://images.opencollective.com/marfeel/c894dad/logo.png',
    url: 'https://opencollective.com/marfeel',
  },
  {
    name: 'Percy',
    image: 'https://images.opencollective.com/percy_io/80d9595/logo.png',
    url: 'https://opencollective.com/percy_io',
  },
  {
    name: 'Gusto',
    image: 'https://images.opencollective.com/gusto/483a29b/logo.png',
    url: 'https://opencollective.com/gusto',
  },
  {
    name: 'VisWiz.io - Visual Regression Testing',
    image: 'https://images.opencollective.com/viswiz_io/972852a/logo.png',
    url: 'https://opencollective.com/viswiz_io',
  },
  {
    name: 'Algolia',
    image: 'https://images.opencollective.com/algolia/d8c48b7/logo.png',
    url: 'https://opencollective.com/algolia',
  },
  {
    name: 'Canva',
    image: 'https://images.opencollective.com/canvaofficial/7217c4d/logo.png',
    url: 'https://opencollective.com/canvaofficial',
  },
  {
    name: 'Cybozu',
    image: 'https://images.opencollective.com/cybozu/933e46d/logo.png',
    url: 'https://opencollective.com/cybozu',
  },
  {
    name: 'Slalom Build',
    image: 'https://images.opencollective.com/slalombuild/cb148c4/logo.png',
    url: 'https://opencollective.com/slalombuild',
  },
  {
    name: 'Intuit Open Source',
    image:
      'https://images.opencollective.com/intuit-open-source/62f6394/logo.png',
    url: 'https://opencollective.com/intuit-open-source',
  },
  {
    name: 'Buy Google Reviews',
    image:
      'https://images.opencollective.com/buy-google-reviews-usa/78797fd/logo.png',
    url: 'https://opencollective.com/buy-google-reviews-usa',
  },
  {
    name: 'Skyscanner',
    image: 'https://images.opencollective.com/skyscanner/dcc6fe7/logo.png',
    url: 'https://opencollective.com/skyscanner',
  },
  {
    name: 'Sendcloud',
    image: 'https://images.opencollective.com/sendcloud/fdc27e6/logo.png',
    url: 'https://opencollective.com/sendcloud',
  },
  {
    name: 'CodeRabbit',
    image: 'https://images.opencollective.com/coderabbit/c0d1370/logo.png',
    url: 'https://opencollective.com/coderabbit',
  },
  {
    name: 'EY Doberman',
    image: 'https://images.opencollective.com/ey-doberman/b269462/logo.png',
    url: 'https://opencollective.com/ey-doberman',
  },
  {
    name: 'Agendrix',
    image: 'https://images.opencollective.com/agendrix/32bd295/logo.png',
    url: 'https://opencollective.com/agendrix',
  },
  {
    name: 'Sebastian Software GmbH',
    image: 'https://images.opencollective.com/sebastiansoft/c8c1bf5/logo.png',
    url: 'https://opencollective.com/sebastiansoft',
  },
  {
    name: 'Live Graphic Systems',
    image: 'https://images.opencollective.com/livegraphicsys/0244296/logo.png',
    url: 'https://opencollective.com/livegraphicsys',
  },
  {
    name: 'Triplebyte',
    image: 'https://images.opencollective.com/triplebyte/3f80e63/logo.png',
    url: 'https://opencollective.com/triplebyte',
  },
  {
    name: 'Fusonic GmbH',
    image: 'https://images.opencollective.com/fusonic/02ed1e5/logo.png',
    url: 'https://opencollective.com/fusonic',
  },
];
