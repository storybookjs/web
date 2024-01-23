import {
  LogoAirbnb,
  LogoBbc,
  LogoEu,
  LogoGithub,
  LogoMonday,
  LogoMozilla,
  LogoVscode,
} from "./hero/demo/logos";

export default function SocialProof() {
  return (
    <div className="relative z-10 max-w-sm sm:max-w-6xl m-auto px-8 md:px-16 py-8 md:py-12">
      <div className="flex w-full justify-evenly items-center gap-8 sm:gap-8 md:gap-12 lg:gap-16 text-zinc-600 h-4 sm:h-6">
        <div className="flex-initial flex-shrink-0 hidden sm:flex items-center justify-center h-full">
          <LogoEu />
        </div>
        <div className="flex-grow-1 flex-shrink-0 flex items-center justify-center h-full">
          <LogoGithub />
        </div>
        <div className="flex-grow-1 flex-shrink-0 flex items-center justify-center h-full">
          <LogoAirbnb />
        </div>
        <div className="flex-initial flex-shrink-0 hidden sm:flex items-center justify-center h-full">
          <LogoVscode />
        </div>
        <div className="flex-grow-1 flex-shrink-0 flex items-center justify-center h-full">
          <LogoMozilla />
        </div>
        <div className="flex-grow-1 flex-shrink-0 hidden md:flex items-center justify-center h-full">
          <LogoMonday />
        </div>
        <div className="flex-grow-1 flex-shrink-0 hidden items-center justify-center h-full lg:flex">
          <LogoBbc />
        </div>
      </div>
    </div>
  );
}
