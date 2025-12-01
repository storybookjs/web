import Image from 'next/image';

interface GetStartedVersionsProps {
  versions: {
    name: string;
    range: string;
    icon: string;
  }[];
}

export function GetStartedVersions({ versions }: GetStartedVersionsProps) {
  return (
    <ul className="flex flex-column gap-10 w-full m-0">
      {versions.map(({ name, icon, range }) => (
        <li key={name} className="flex h-12 items-center gap-3 text-md text-black dark:text-white">
          <Image alt="" height="20" src={icon} width="20" className="grayscale" />
          <p>
            {name} {range}
          </p>
        </li>
      ))}
    </ul>
  );
}
