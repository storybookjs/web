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
    <div className="w-full text-zinc-600 relative border-b border-b-white/20 z-10 m-auto px-4 py-12 sm:py-16 md:py-20 mb-12 md:mb-20">
      <div className="flex justify-evenly items-center  gap-8 md:gap-12 lg:gap-16 opacity-50 flex-wrap">
        <Image alt="VSCode" className="w-8" src={logoVSCode} />
        <Image alt="EU" className="w-8 hidden sm:block" src={logoEu} />
        <Image alt="Github" className="w-20" src={logoGithub} />
        <Image alt="Airbnb" className="w-20" src={logoAirbnb} />
        <Image alt="Mozilla" className="w-20" src={logoMozilla} />
        <Image
          alt="Monday.com"
          className="w-32 hidden sm:block"
          src={logoMonday}
        />
        <Image alt="BBC" className="w-20" src={logoBBC} />
      </div>
    </div>
  );
}
