import Image from 'next/image';
import Link from 'next/link';

export const HomeConcepts = () => {
  return (
    <div className="grid grid-cols-1 gap-4 mb-6 sm:grid-cols-2">
      <Card
        href="/docs/writing-stories"
        logo="icon-story.svg"
        title="Stories"
        content="A story captures the rendered state of a UI component. Each component can have multiple stories, where each story describes a different component state."
      />
      <Card
        href="/docs/writing-docs"
        logo="icon-docs.svg"
        title="Docs"
        content="Storybook can analyze your components to automatically create documentation alongside your stories. This automatic documentation makes it easier for you to create UI library usage guidelines, design system sites, and more."
      />
      <Card
        href="/docs/writing-tests"
        logo="icon-testing.svg"
        title="Testing"
        content="Stories are a pragmatic starting point for your UI testing strategy. You already write stories as a natural part of UI development, so testing those stories is a low-effort way to prevent UI bugs over time."
      />
      <Card
        href="/docs/sharing"
        logo="icon-sharing.svg"
        title="Sharing"
        content="Publishing your Storybook allows you to share your work with others. You can also embed your stories in places like Notion or Figma."
      />
    </div>
  );
};

const Card = ({
  href,
  logo,
  title,
  content,
}: {
  href: string;
  logo: string;
  title: string;
  content: string;
}) => {
  return (
    <Link
      href={href}
      className="gap-3 p-6 transition-all border rounded-md border-slate-200 hover:border-slate-300 hover:-translate-y-px"
    >
      <div className="flex items-center gap-4 mb-4">
        <Image src={`/images/icons/${logo}`} width="20" height="20" alt="" />
        <h3 className="font-bold text-black text-md">{title}</h3>
      </div>
      <p className="text-sm leading-6 text-slate-600">{content}</p>
    </Link>
  );
};
