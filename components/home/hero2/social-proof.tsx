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
    <div className="relative border-b border-b-white/20 z-10 m-auto px-8 md:px-16 py-8 md:py-12">
      <div className="flex w-full justify-evenly items-center gap-8 sm:gap-8 md:gap-12 lg:gap-16 text-zinc-600 h-4 sm:h-6">
        <div className="flex-initial flex-shrink-0 hidden sm:flex items-center justify-center h-full">
          <Image
            src={logoVSCode}
            alt="VSCode"
            className="w-full h-full opacity-50"
          />
        </div>
        <div className="flex-initial flex-shrink-0 hidden sm:flex items-center justify-center h-full">
          <Image src={logoEu} alt="EU" className="w-full h-full opacity-50" />
        </div>
        <div className="flex-grow-1 flex-shrink-0 flex items-center justify-center h-full">
          <Image
            src={logoGithub}
            alt="Github"
            className="w-full h-full opacity-50"
          />
        </div>
        <div className="flex-grow-1 flex-shrink-0 flex items-center justify-center h-full">
          <Image
            src={logoAirbnb}
            alt="Airbnb"
            className="w-full h-full opacity-50"
          />
        </div>
        <div className="flex-grow-1 flex-shrink-0 flex items-center justify-center h-full">
          <Image
            src={logoMozilla}
            alt="Mozilla"
            className="w-full h-full opacity-50"
          />
        </div>
        <div className="flex-grow-1 flex-shrink-0 hidden md:flex items-center justify-center h-full">
          <Image
            src={logoMonday}
            alt="Monday.com"
            className="w-full h-full opacity-50"
          />
        </div>
        <div className="flex-grow-1 flex-shrink-0 hidden items-center justify-center h-full lg:flex">
          <Image src={logoBBC} alt="BBC" className="w-full h-full opacity-50" />
        </div>
      </div>
    </div>
  );
}
