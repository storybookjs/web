import { Container } from '@repo/ui';

// Shell for the "Review what changed" section. The content is built in a
// separate task; this keeps the page order and sticky nav in place.
export function Review() {
  return (
    <section className="overflow-hidden border-b border-zinc-600 pt-12 sm:pt-20 md:pt-28">
      <Container className="justify-between gap-20 pb-12 text-white sm:pb-20 md:flex md:pb-28">
        <h2 className="flex-1 text-4xl font-bold md:text-[56px]/[70px]">
          Review what changed
        </h2>
      </Container>
    </section>
  );
}
