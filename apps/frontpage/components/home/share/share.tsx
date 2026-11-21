import { Container } from '@repo/ui';
import { Testimonial } from '../testimonial';
import { LogoCloudbees } from './logo-cloudbee';
import { ShareContextAnimation } from './share-context-animation';

const features = [
  {
    title: 'Publish a single canonical UI context',
    description: (
      <>
        Publish your Storybook and its context using{' '}
        <a
          className="text-blue-500"
          href="https://www.chromatic.com/?ref=storybook"
        >
          Chromatic
        </a>{' '}
        so agents and other tools reference the same UI context. AI never
        operates against stale or invalid context.
      </>
    ),
  },
  {
    title: 'Control updates to UI context',
    description:
      'Changes to UI context are explicit and human reviewable. Chromatic tracks updates, enforces permissions, and preserves history so agents operate against approved context.',
  },
];

export function Share() {
  return (
    <div className="overflow-hidden border-b border-zinc-600 pt-12 sm:pt-20 md:pt-28">
      <Container className="justify-between gap-20 text-white md:flex">
        <h2 className="flex-1 text-4xl font-bold md:text-[56px]/[70px]">
          Share UI context across teams
        </h2>
        <div className="flex-1 pt-4">
          <p className="mb-6 max-w-[520px] leading-7">
            Stories show how the UI actually works, not just a static design of
            how it&apos;s supposed to work. Publish your Storybook as a reference
            so teammates and agents all work from the same reviewed context.
          </p>
        </div>
      </Container>
      <Container>
        <ShareContextAnimation />
        <div className="mx-auto grid gap-12 pb-12 text-white md:grid-cols-2 md:pb-20 lg:gap-20">
          {features.map((feature) => (
            <div key={feature.title}>
              <h3 className="mb-2 font-bold">{feature.title}</h3>
              <p className="leading-relaxed">{feature.description}</p>
            </div>
          ))}
        </div>
      </Container>
      <Testimonial
        avatarUrl="https://avatars2.githubusercontent.com/u/8724083?s=460&v=4"
        jobTitle="Author of Building Design Systems"
        logo={<LogoCloudbees />}
        name="Sarrah Vesselov"
        text="“Storybook is my go-to when starting a new design system. It makes
            getting something in place quick and easy for both design and
            engineering.”"
      />
    </div>
  );
}
