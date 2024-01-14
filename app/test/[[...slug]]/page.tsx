import { promises as fs } from "fs";

interface Props {
  params: {
    slug: string[];
  };
}

export const generateStaticParams = async () => {
  return [{ slug: ["test-1"] }, { slug: ["test-2"] }];
};

export default async function Page({ params: { slug } }: Props) {
  const file = await fs.readFile(process.cwd() + "/content/data.json", "utf8");
  const data = JSON.parse(file);

  return (
    <main className="flex flex-col min-h-screen items-center justify-center">
      <div>Slug: {slug}</div>
      <h1>{data.title}</h1>
      <p>{data.content}</p>
    </main>
  );
}
