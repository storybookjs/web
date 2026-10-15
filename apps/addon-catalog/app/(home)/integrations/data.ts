import type { Integration } from '../../../types';
import jetbrainsIcon from '../../../images/integrations/jetbrains-icon.svg';
import jetbrainsImage from '../../../images/integrations/jetbrains-storybook-connect.webp';

export const integrations: Integration[] = [
  {
    name: 'Storybook Connect',
    platform: 'JetBrains IDEs',
    description:
      'Browse, navigate, and generate stories in WebStorm, IntelliJ IDEA, and other JetBrains IDEs. Sync selection with your Storybook and control its dev server.',
    href: 'https://plugins.jetbrains.com/plugin/33386-storybook-connect',
    icon: jetbrainsIcon,
    image: jetbrainsImage,
  },
];
