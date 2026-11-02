import type { Integration } from '../../../types';
import figmaIcon from '../../../images/integrations/figma-icon.svg';
import figmaImage from '../../../images/integrations/figma-storybook-connect.webp';
import jetbrainsIcon from '../../../images/integrations/jetbrains-icon.svg';
import jetbrainsImage from '../../../images/integrations/jetbrains-storybook-connect.webp';
import uxpinIcon from '../../../images/integrations/uxpin-icon.svg';
import uxpinImage from '../../../images/integrations/uxpin-merge.webp';

export const integrations: Integration[] = [
  {
    name: 'Storybook Connect',
    platform: 'Figma',
    description:
      'Link design components to stories and play with them in Figma. Compare the live implementation to the design in one place.',
    href: 'https://www.figma.com/community/plugin/1056265616080331589/storybook-connect',
    icon: figmaIcon,
    image: figmaImage,
  },
  {
    name: 'Storybook Connect',
    platform: 'JetBrains IDEs',
    description:
      'Browse, navigate, and generate stories in WebStorm, IntelliJ IDEA, and other JetBrains IDEs. Sync selection with your Storybook and control its dev server.',
    href: 'https://plugins.jetbrains.com/plugin/33386-storybook-connect',
    icon: jetbrainsIcon,
    image: jetbrainsImage,
  },
  {
    name: 'Merge',
    platform: 'UXPin',
    description:
      'Design with the same interactive, code-backed components your developers ship. Components sync from your Storybook, so your design library stays current.',
    href: 'https://www.uxpin.com/merge/storybook-integration',
    icon: uxpinIcon,
    image: uxpinImage,
  },
];
