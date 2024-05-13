import Image from 'next/image';
import Link from 'next/link';

export function HomeRenderers() {
  return (
    <div className="grid grid-cols-1 gap-4 mb-6 sm:grid-cols-2 xl:grid-cols-3">
      <Card
        href="/docs/get-started/nextjs/?renderer=react"
        logo="logo-nextjs.svg"
        title="Next.js"
      />
      <Card
        href="/docs/get-started/react-vite/?renderer=react"
        logo="logo-react.svg"
        subtitle="with Vite"
        title="React"
      />
      <Card
        href="/docs/get-started/react-webpack5/?renderer=react"
        logo="logo-react.svg"
        subtitle="with Webpack"
        title="React"
      />
      <Card
        href="https://github.com/storybookjs/react-native"
        logo="logo-react.svg"
        title="React Native"
      />
      <Card
        href="/docs/get-started/vue3-vite/?renderer=vue"
        logo="logo-vue.svg"
        subtitle="with Vite"
        title="Vue"
      />
      <Card
        href="/docs/get-started/vue3-webpack5/?renderer=vue"
        logo="logo-vue.svg"
        subtitle="with Webpack"
        title="Vue"
      />
      <Card
        href="/docs/get-started/angular/?renderer=angular"
        logo="logo-angular.svg"
        title="Angular"
      />
      <Card
        href="/docs/get-started/sveltekit/?renderer=svelte"
        logo="logo-svelte.svg"
        title="SvelteKit"
      />
      <Card
        href="/docs/get-started/svelte-vite/?renderer=svelte"
        logo="logo-svelte.svg"
        subtitle="with Vite"
        title="Svelte"
      />
      <Card
        href="/docs/get-started/svelte-webpack5/?renderer=svelte"
        logo="logo-svelte.svg"
        subtitle="with Webpack"
        title="Svelte"
      />
      <Card
        href="/docs/get-started/web-components-vite/?renderer=web-components"
        logo="logo-web-components.svg"
        subtitle="with Vite"
        title="Web Components"
      />
      <Card
        href="/docs/get-started/web-components-webpack5/?renderer=web-components"
        logo="logo-web-components.svg"
        subtitle="with Webpack"
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
      className="flex items-center h-20 gap-3 pl-5 transition-all border rounded-md border-slate-200 hover:border-slate-300 hover:-translate-y-px"
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
          <h3 className="font-bold text-black text-md">{title}</h3>
          <p className="text-sm text-slate-600">{subtitle}</p>
        </div>
      ) : (
        <h3 className="font-bold text-black text-md">{title}</h3>
      )}
    </Link>
  );
}
