import { PlusIcon } from '@storybook/icons';

interface PageHeaderProps {
  title: string;
  description: string;
  /** Call to action, linking to the integration catalog docs */
  action?: { label: string; href: string };
}

export const PageHeader = ({ title, description, action }: PageHeaderProps) => (
  <div className="mb-8 flex items-start justify-between">
    <div>
      <h1 className="mb-4 text-4xl font-bold">{title}</h1>
      <p className="text-black dark:text-slate-400">{description}</p>
    </div>
    {action ? (
      <a
        href={action.href}
        className="hidden h-10 flex-shrink-0 items-center gap-2 rounded-full bg-blue-500 px-5 text-sm font-bold text-white md:flex"
      >
        <PlusIcon />
        {action.label}
      </a>
    ) : null}
  </div>
);
