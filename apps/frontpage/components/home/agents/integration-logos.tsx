import Image from 'next/image';

const integrations = [
  {
    name: 'Cursor',
    logo: '/images/logos/integrations/integrations-cursor.svg',
  },
  {
    name: 'OpenAI',
    logo: '/images/logos/integrations/integrations-openai.svg',
  },
  {
    name: 'Copilot',
    logo: '/images/logos/integrations/integrations-copilot.svg',
  },
  {
    name: 'Claude',
    logo: '/images/logos/integrations/integrations-claude.svg',
  },
  {
    name: 'Gemini',
    logo: '/images/logos/integrations/integrations-gemini.svg',
  },
  {
    name: 'VS Code',
    logo: '/images/logos/integrations/integrations-vscode.svg',
  },
  {
    name: 'JetBrains',
    logo: '/images/logos/integrations/integrations-jetbrains.svg',
  },
];

export function IntegrationLogos() {
  return (
    <div className="flex flex-col items-center gap-6 pt-12 md:pt-16">
      <span className="text-sm text-white/60">
        Works with your coding agent
      </span>
      <div className="flex flex-wrap items-center justify-center gap-4 sm:gap-8 md:gap-12">
        {integrations.map((integration) => (
          <Image
            alt={integration.name}
            className="h-8 w-8 rounded-md ring-1 ring-white/10 sm:h-10 sm:w-10 md:h-12 md:w-12"
            height={48}
            key={integration.name}
            src={integration.logo}
            width={48}
          />
        ))}
      </div>
    </div>
  );
}
