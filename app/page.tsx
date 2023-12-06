import { Hero } from "@/components/home/hero";
import { Footer } from "@/components/footer/footer";
import { Header } from "@/components/header/header";

export default function Home() {
  return (
    <div className="bg-zinc-900">
      <Header variant="home" />
      <Hero />
      <main className="max-w-8xl mx-auto px-4 lg:px-8 py-12 text-white">
        <div className="w-full flex-1 bg-zinc-600/10 min-h-[1400px]" />
      </main>
      <Footer variant="home" />
    </div>
  );
}
