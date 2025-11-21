import Image from 'next/image';
import Link from 'next/link';

export function CommunityRenderers() {
  return (
    <div className="mb-6 grid grid-cols-1 gap-4 sm:grid-cols-2 xl:grid-cols-3">
      <Card
        href="https://analogjs.org/docs/integrations/storybook"
        logo="logo-analog.svg"
        title="Analog"
        subtitle="with Vite"
      />
      <Card
        href="https://storybook.nuxtjs.org/"
        logo="logo-nuxt.svg"
        title="Nuxt"
        subtitle="with Vite"
      />
      <Card
        href="https://github.com/solidjs-community/storybook"
        logo="logo-solidjs.svg"
        title="SolidJS"
        subtitle="with Vite"
      />
      <Card
        href="https://storybook.rsbuild.dev/guide/framework/react.html"
        logo="logo-react.svg"
        title="React"
        subtitle="with Rspack / Rsbuild"
      />
      <Card
        href="https://storybook.rsbuild.dev/guide/framework/vue.html"
        logo="logo-vue.svg"
        title="Vue"
        subtitle="with Rspack / Rsbuild"
      />
      <Card
        href="https://storybook.rsbuild.dev/guide/framework/web-components.html"
        logo="logo-web-components.svg"
        title="Web Components"
        subtitle="with Rspack / Rsbuild"
      />
    </div>
  );
}

function Card({
  href,
  logo,
  title,
  subtitle,
}: {
  href: string;
  logo: string;
  title: string;
  subtitle?: string;
}) {
  return (
    <Link
      className="flex h-20 items-center gap-3 rounded-md border border-slate-200 pl-5 transition-all hover:-translate-y-px hover:border-slate-300 dark:border-slate-700 dark:hover:border-slate-600"
      href={href}
    >
      <Image
        alt=""
        height="28"
        src={`/images/logos/renderers/${logo}`}
        width="28"
      />
      {subtitle ? (
        <div>
          <p className="text-md font-bold text-black dark:text-white">
            {title}
          </p>
          <p className="text-sm text-slate-600 dark:text-slate-400">
            {subtitle}
          </p>
        </div>
      ) : (
        <p className="text-md font-bold text-black dark:text-white">{title}</p>
      )}
    </Link>
  );
}
