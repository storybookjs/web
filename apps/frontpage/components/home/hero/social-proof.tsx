import Image from 'next/image';
import logoEu from './logos/logo-eu.svg';
import logoGithub from './logos/logo-github.svg';
import logoAirbnb from './logos/logo-airbnb.svg';
import logoVSCode from './logos/logo-vscode.svg';
import logoMozilla from './logos/logo-mozilla.svg';
import logoMonday from './logos/logo-monday.svg';
import logoBBC from './logos/logo-bbc.svg';

export default function SocialProof() {
  return (
    <div className="relative z-10 m-auto mb-12 w-full border-b border-b-white/20 px-4 py-12 text-zinc-600 sm:py-16 md:mb-20 md:py-20">
      <div className="flex flex-wrap items-center justify-evenly gap-8 opacity-50 md:gap-12 lg:gap-16">
        <Image alt="VSCode" className="w-8 lg:w-10" src={logoVSCode} />
        <Image alt="EU" className="hidden w-8 sm:block lg:w-12" src={logoEu} />
        <Image alt="Github" className="w-20 lg:w-24" src={logoGithub} />
        <Image alt="Airbnb" className="w-20 lg:w-28" src={logoAirbnb} />
        <Image alt="Mozilla" className="w-20 lg:w-28" src={logoMozilla} />
        <Image
          alt="Monday.com"
          className="hidden w-32 md:block lg:w-36"
          src={logoMonday}
        />
        <Image
          alt="BBC"
          className="hidden w-20 lg:w-28 xl:block"
          src={logoBBC}
        />
      </div>
    </div>
  );
}
