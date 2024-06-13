interface PageProps {
  params: {
    slug: string[];
  };
}

export const generateStaticParams = () => {
  const result: { slug: string[] }[] = [];

  return result;
};

export default async function Page({ params: { slug } }: PageProps) {
  // if (!page) notFound();

  return <div className="">{slug}</div>;
}
