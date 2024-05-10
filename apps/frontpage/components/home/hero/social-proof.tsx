import Image from "next/image";
import logoEu from "./logos/logo-eu.svg";
import logoGithub from "./logos/logo-github.svg";
import logoAirbnb from "./logos/logo-airbnb.svg";
import logoVSCode from "./logos/logo-vscode.svg";
import logoMozilla from "./logos/logo-mozilla.svg";
import logoMonday from "./logos/logo-monday.svg";
import logoBBC from "./logos/logo-bbc.svg";

export default function SocialProof() {
  return (
    <div className="relative border-b border-b-white/20 z-10 m-auto px-8 md:px-16 py-12 sm:py-16 md:py-20 mb-12 md:mb-20">
      <div className="flex w-full justify-evenly items-center gap-8 sm:gap-8 md:gap-12 lg:gap-16 text-zinc-600">
        <div className="flex-initial flex-shrink-0 hidden sm:flex items-center justify-center h-10">
          <Image
            alt="VSCode"
            className="w-full h-full opacity-50"
            src={logoVSCode}
          />
        </div>
        <div className="flex-initial flex-shrink-0 hidden sm:flex items-center justify-center h-8">
          <Image alt="EU" className="w-full h-full opacity-50" src={logoEu} />
        </div>
        <div className="flex-grow-1 flex-shrink-0 flex items-center justify-center h-5 sm:h-6">
          <Image
            alt="Github"
            className="w-full h-full opacity-50"
            src={logoGithub}
          />
        </div>
        <div className="flex-grow-1 flex-shrink-0 flex items-center justify-center h-6 sm:h-8">
          <Image
            alt="Airbnb"
            className="w-full h-full opacity-50"
            src={logoAirbnb}
          />
        </div>
        <div className="flex-grow-1 flex-shrink-0 flex items-center justify-center h-6 sm:h-7">
          <Image
            alt="Mozilla"
            className="w-full h-full opacity-50"
            src={logoMozilla}
          />
        </div>
        <div className="flex-grow-1 flex-shrink-0 hidden lg:flex items-center justify-center h-7">
          <Image
            alt="Monday.com"
            className="w-full h-full opacity-50"
            src={logoMonday}
          />
        </div>
        <div className="flex-grow-1 flex-shrink-0 hidden items-center justify-center h-6 xl:flex">
          <Image alt="BBC" className="w-full h-full opacity-50" src={logoBBC} />
        </div>
      </div>
    </div>
  );
}
