import Image from 'next/image';
import type { FC } from 'react';
import { Button } from '../ui/button';
import { Section } from './section';

export const Team: FC = () => {
  return (
    <Section className="relative mb-8 md:mb-16" id="maintainer-team">
      <h2 className="mb-2 text-2xl font-bold">Contributors</h2>
      <p className="mb-8">
        Storybook is maintained by thousands of contributors worldwide and
        guided by a steering committee of top maintainers.
      </p>
      <ul className="mb-8 grid grid-cols-5 gap-4 sm:grid-cols-8 md:grid-cols-12">
        {contributors.map((contributor) => (
          <li className="h-10 w-10 flex-shrink-0" key={contributor.name}>
            <a href={contributor.url} rel="noreferrer" target="_blank">
              <Image
                alt={contributor.name}
                className="h-10 w-10 rounded-full"
                height={40}
                src={contributor.avatar}
                width={40}
              />
            </a>
          </li>
        ))}
      </ul>
      <div className="flex">
        <Button asChild rounded="full" variant="solid">
          <a
            href="https://github.com/storybookjs/storybook/graphs/contributors"
            rel="noreferrer"
            target="_blank"
          >
            View all contributors on Github
          </a>
        </Button>
      </div>
    </Section>
  );
};

const contributors = [
  {
    name: 'Norbert de Langen',
    avatar: 'https://avatars2.githubusercontent.com/u/3070389?s=200&v=4',
    url: 'https://github.com/ndelangen',
  },
  {
    name: 'Filipp Riabchun',
    avatar: 'https://avatars0.githubusercontent.com/u/6651625?s=200&v=4',
    url: 'https://github.com/Hypnosphi',
  },
  {
    name: 'Michael Shilman',
    avatar: 'https://avatars0.githubusercontent.com/u/488689?s=200&v=4',
    url: 'https://github.com/shilman',
  },
  {
    name: 'Igor Davydkin',
    avatar: 'https://avatars1.githubusercontent.com/u/7867954?s=200&v=4',
    url: 'https://github.com/igor-dv',
  },
  {
    name: 'Tom Coleman',
    avatar: 'https://avatars0.githubusercontent.com/u/132554?s=200&v=4',
    url: 'https://github.com/tmeasday',
  },
  {
    name: 'arunoda',
    avatar: 'https://avatars.githubusercontent.com/u/50838?v=4',
    url: 'https://github.com/arunoda',
  },
  {
    name: 'thani-sh',
    avatar: 'https://avatars.githubusercontent.com/u/136691?v=4',
    url: 'https://github.com/thani-sh',
  },
  {
    name: 'ghengeveld',
    avatar: 'https://avatars.githubusercontent.com/u/321738?v=4',
    url: 'https://github.com/ghengeveld',
  },
  {
    name: 'jonniebigodes',
    avatar: 'https://avatars.githubusercontent.com/u/22988955?v=4',
    url: 'https://github.com/jonniebigodes',
  },
  {
    name: 'gaetanmaisse',
    avatar: 'https://avatars.githubusercontent.com/u/4112568?v=4',
    url: 'https://github.com/gaetanmaisse',
  },
  {
    name: 'yannbf',
    avatar: 'https://avatars.githubusercontent.com/u/1671563?v=4',
    url: 'https://github.com/yannbf',
  },
  {
    name: 'domyen',
    avatar: 'https://avatars.githubusercontent.com/u/263385?v=4',
    url: 'https://github.com/domyen',
  },
  {
    name: 'danielduan',
    avatar: 'https://avatars.githubusercontent.com/u/1474548?v=4',
    url: 'https://github.com/danielduan',
  },
  {
    name: 'kroeder',
    avatar: 'https://avatars.githubusercontent.com/u/5478899?v=4',
    url: 'https://github.com/kroeder',
  },
  {
    name: 'tooppaaa',
    avatar: 'https://avatars.githubusercontent.com/u/599163?v=4',
    url: 'https://github.com/tooppaaa',
  },
  {
    name: 'CodeByAlex',
    avatar: 'https://avatars.githubusercontent.com/u/29763590?v=4',
    url: 'https://github.com/CodeByAlex',
  },
  {
    name: 'IanVS',
    avatar: 'https://avatars.githubusercontent.com/u/4616705?v=4',
    url: 'https://github.com/IanVS',
  },
  {
    name: 'ThibaudAV',
    avatar: 'https://avatars.githubusercontent.com/u/4974420?v=4',
    url: 'https://github.com/ThibaudAV',
  },
  {
    name: 'Gongreg',
    avatar: 'https://avatars.githubusercontent.com/u/3867635?v=4',
    url: 'https://github.com/Gongreg',
  },
  {
    name: 'patricklafrance',
    avatar: 'https://avatars.githubusercontent.com/u/794579?v=4',
    url: 'https://github.com/patricklafrance',
  },
  {
    name: 'atanasster',
    avatar: 'https://avatars.githubusercontent.com/u/6075606?v=4',
    url: 'https://github.com/atanasster',
  },
  {
    name: 'lonyele',
    avatar: 'https://avatars.githubusercontent.com/u/15892571?v=4',
    url: 'https://github.com/lonyele',
  },
  {
    name: 'alterx',
    avatar: 'https://avatars.githubusercontent.com/u/1593752?v=4',
    url: 'https://github.com/alterx',
  },
  {
    name: 'Keraito',
    avatar: 'https://avatars.githubusercontent.com/u/5955441?v=4',
    url: 'https://github.com/Keraito',
  },
  {
    name: 'benoitdion',
    avatar: 'https://avatars.githubusercontent.com/u/573574?v=4',
    url: 'https://github.com/benoitdion',
  },
  {
    name: 'Tomastomaslol',
    avatar: 'https://avatars.githubusercontent.com/u/1872246?v=4',
    url: 'https://github.com/Tomastomaslol',
  },
  {
    name: 'MichaelArestad',
    avatar: 'https://avatars.githubusercontent.com/u/1123119?v=4',
    url: 'https://github.com/MichaelArestad',
  },
  {
    name: 'phated',
    avatar: 'https://avatars.githubusercontent.com/u/992373?v=4',
    url: 'https://github.com/phated',
  },
  {
    name: 'jsoref',
    avatar: 'https://avatars.githubusercontent.com/u/2119212?v=4',
    url: 'https://github.com/jsoref',
  },
  {
    name: 'plumpNation',
    avatar: 'https://avatars.githubusercontent.com/u/651122?v=4',
    url: 'https://github.com/plumpNation',
  },
  {
    name: 'usulpro',
    avatar: 'https://avatars.githubusercontent.com/u/14885189?v=4',
    url: 'https://github.com/usulpro',
  },
  {
    name: 'Jessica-Koch',
    avatar: 'https://avatars.githubusercontent.com/u/9360417?v=4',
    url: 'https://github.com/Jessica-Koch',
  },
  {
    name: 'kylegach',
    avatar: 'https://avatars.githubusercontent.com/u/486540?v=4',
    url: 'https://github.com/kylegach',
  },
  {
    name: 'rhalff',
    avatar: 'https://avatars.githubusercontent.com/u/274358?v=4',
    url: 'https://github.com/rhalff',
  },
  {
    name: 'jonspalmer',
    avatar: 'https://avatars.githubusercontent.com/u/328224?v=4',
    url: 'https://github.com/jonspalmer',
  },
  {
    name: 'pksunkara',
    avatar: 'https://avatars.githubusercontent.com/u/174703?v=4',
    url: 'https://github.com/pksunkara',
  },
  {
    name: 'winkerVSbecks',
    avatar: 'https://avatars.githubusercontent.com/u/42671?v=4',
    url: 'https://github.com/winkerVSbecks',
  },
  {
    name: 'alexandrebodin',
    avatar: 'https://avatars.githubusercontent.com/u/6065744?v=4',
    url: 'https://github.com/alexandrebodin',
  },
  {
    name: 'darleendenno',
    avatar: 'https://avatars.githubusercontent.com/u/17681528?v=4',
    url: 'https://github.com/darleendenno',
  },
  {
    name: 'jamesgeorge007',
    avatar: 'https://avatars.githubusercontent.com/u/25279263?v=4',
    url: 'https://github.com/jamesgeorge007',
  },
  {
    name: 'wuweiweiwu',
    avatar: 'https://avatars.githubusercontent.com/u/35270620?v=4',
    url: 'https://github.com/wuweiweiwu',
  },
  {
    name: 'gabrielcsapo',
    avatar: 'https://avatars.githubusercontent.com/u/1854811?v=4',
    url: 'https://github.com/gabrielcsapo',
  },
  {
    name: 'ritz078',
    avatar: 'https://avatars.githubusercontent.com/u/5389035?v=4',
    url: 'https://github.com/ritz078',
  },
  {
    name: 'libetl',
    avatar: 'https://avatars.githubusercontent.com/u/1233790?v=4',
    url: 'https://github.com/libetl',
  },
  {
    name: 'dangreenisrael',
    avatar: 'https://avatars.githubusercontent.com/u/4509692?v=4',
    url: 'https://github.com/dangreenisrael',
  },
  {
    name: 'brandonseydel',
    avatar: 'https://avatars.githubusercontent.com/u/5033585?v=4',
    url: 'https://github.com/brandonseydel',
  },
  {
    name: 'kylesuss',
    avatar: 'https://avatars.githubusercontent.com/u/3035355?v=4',
    url: 'https://github.com/kylesuss',
  },
  {
    name: 'thinkholic',
    avatar: 'https://avatars.githubusercontent.com/u/1164024?v=4',
    url: 'https://github.com/thinkholic',
  },
  {
    name: 'aaronmcadam',
    avatar: 'https://avatars.githubusercontent.com/u/37928?v=4',
    url: 'https://github.com/aaronmcadam',
  },
  {
    name: 'frassinier',
    avatar: 'https://avatars.githubusercontent.com/u/18534166?v=4',
    url: 'https://github.com/frassinier',
  },
  {
    name: 'Armanio',
    avatar: 'https://avatars.githubusercontent.com/u/3195714?v=4',
    url: 'https://github.com/Armanio',
  },
  {
    name: 'chadfawcett',
    avatar: 'https://avatars.githubusercontent.com/u/3250463?v=4',
    url: 'https://github.com/chadfawcett',
  },
  {
    name: 'kazupon',
    avatar: 'https://avatars.githubusercontent.com/u/72989?v=4',
    url: 'https://github.com/kazupon',
  },
  {
    name: 'joscha',
    avatar: 'https://avatars.githubusercontent.com/u/188038?v=4',
    url: 'https://github.com/joscha',
  },
  {
    name: 'klimentru1986',
    avatar: 'https://avatars.githubusercontent.com/u/16613267?v=4',
    url: 'https://github.com/klimentru1986',
  },
  {
    name: 'merceyz',
    avatar: 'https://avatars.githubusercontent.com/u/3842800?v=4',
    url: 'https://github.com/merceyz',
  },
  {
    name: 'hipstersmoothie',
    avatar: 'https://avatars.githubusercontent.com/u/1192452?v=4',
    url: 'https://github.com/hipstersmoothie',
  },
];
