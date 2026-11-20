import { Container } from '@repo/ui';

// Shell for the Generate section. The section task fills in the copy,
// the GenerateUIAnimation visual, and the agent stats and skills.
export function Generate() {
  return (
    <section className="overflow-hidden border-b border-zinc-600 pb-12 pt-12 sm:pb-20 sm:pt-20 md:pb-28 md:pt-28">
      <Container className="justify-between gap-20 text-white md:flex lg:px-8">
        <h2 className="flex-1 text-4xl font-bold md:text-[56px]/[70px]">
          Generate UI from your components
        </h2>
        <div className="flex-1 pt-4" />
      </Container>
    </section>
  );
}
