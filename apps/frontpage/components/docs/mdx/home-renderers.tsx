import Image from 'next/image';
import Link from 'next/link';
import type { DocsVersion } from '@repo/utils';

interface HomeRenderersProps {
  activeVersion: DocsVersion;
}

export function HomeRenderers({ activeVersion }: HomeRenderersProps) {
  return (
    <div className="mb-6 grid grid-cols-1 gap-4 sm:grid-cols-2 xl:grid-cols-3">
      <Card
        href="/docs/get-started/frameworks/nextjs/?renderer=react"
        logo="logo-nextjs.svg"
        title="Next.js"
      />
      {Number(activeVersion.id) >= 8.5 ? (
        <Card
          href="/docs/get-started/frameworks/nextjs-vite/?renderer=react"
          logo="logo-nextjs.svg"
          subtitle="with Vite"
          title="Next.js"
        />
      ) : null}
      <Card
        href="/docs/get-started/frameworks/react-vite/?renderer=react"
        logo="logo-react.svg"
        subtitle="with Vite"
        title="React"
      />
      <Card
        href="/docs/get-started/frameworks/react-webpack5/?renderer=react"
        logo="logo-react.svg"
        subtitle="with Webpack"
        title="React"
      />
      {Number(activeVersion.id) >= 8.5 ? (
        <Card
          href="/docs/get-started/frameworks/react-native-web-vite/?renderer=react-native-web"
          logo="logo-react.svg"
          subtitle="with Vite (in browser)"
          title="React Native Web"
        />
      ) : null}
      <Card
        href="https://github.com/storybookjs/react-native"
        logo="logo-react.svg"
        title="React Native"
        subtitle="on device"
      />
      <Card
        href="/docs/get-started/frameworks/preact-vite/?renderer=preact"
        logo="logo-preact.svg"
        subtitle="with Vite"
        title="Preact"
      />
      <Card
        href="/docs/get-started/frameworks/vue3-vite/?renderer=vue"
        logo="logo-vue.svg"
        subtitle="with Vite"
        title="Vue"
      />
      <Card
        href="/docs/get-started/frameworks/angular/?renderer=angular"
        logo="logo-angular.svg"
        title="Angular"
      />
      <Card
        href="/docs/get-started/frameworks/sveltekit/?renderer=svelte"
        logo="logo-svelte.svg"
        title="SvelteKit"
      />
      <Card
        href="/docs/get-started/frameworks/svelte-vite/?renderer=svelte"
        logo="logo-svelte.svg"
        subtitle="with Vite"
        title="Svelte"
      />
      <Card
        href="/docs/get-started/frameworks/web-components-vite/?renderer=web-components"
        logo="logo-web-components.svg"
        subtitle="with Vite"
        title="Web Components"
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
