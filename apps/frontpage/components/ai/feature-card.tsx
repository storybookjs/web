interface FeatureCardProps {
  title: string;
  description: string;
  icon?: React.ReactNode;
}

export function FeatureCard({ title, description, icon }: FeatureCardProps) {
  return (
    <div>
      {icon ? <div className="mb-5 h-8 w-8 sm:h-10 sm:w-10">{icon}</div> : null}
      <h3 className="mb-2 font-bold text-white">{title}</h3>
      <p className="leading-relaxed text-white">{description}</p>
    </div>
  );
}
