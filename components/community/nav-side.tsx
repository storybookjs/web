import { FC } from "react";

export const NavSide: FC = () => {
  return (
    <div className="w-[200px] hidden lg:block sticky self-start top-28">
      {[
        { label: "⭐  Support", href: "#support" },
        { label: "🎪  Events & streams", href: "#events-streams" },
        { label: "⚡️  Brand & resources", href: "#brand-resources" },
        { label: "🌎  Maintainer team", href: "#maintainer-team" },
        { label: "🛠  Contribute", href: "#contribute" },
        { label: "💅  Sponsor", href: "#sponsor" },
      ].map(({ label, href }) => (
        <a key={href} href={href} className="h-10 flex items-center">
          <span>{label}</span>
        </a>
      ))}
    </div>
  );
};
