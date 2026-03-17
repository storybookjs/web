import { Container } from '@repo/ui';

export const SectionLede = ({
  title,
  description,
}: {
  title: string;
  description: string;
}) => (
  <Container className="justify-between gap-20 text-white lg:flex">
    <h2 className="flex-1 text-3xl font-bold md:text-[40px]/[48px] lg:text-[56px]/[70px]">
      {title}
    </h2>
    <div className="flex-1 pt-4">
      <p className="mb-6 leading-7 lg:max-w-[520px]">{description}</p>
    </div>
  </Container>
);
