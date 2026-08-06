import Header from "@/components/layout/Header";

import Hero from "@/components/home/Hero";
import LatestNews from "@/components/home/LatestNews";

import { getLatestNews } from "@/lib/services/news";
import { getStatistics } from "@/lib/services/home";

export default async function HomePage() {

  
const news = await getLatestNews(8);
const statistics = await getStatistics();

  return (
    <div className="min-h-screen bg-zinc-950 text-white">

      <Header />

      <main className="mx-auto max-w-7xl space-y-8 px-6 py-8">

        <Hero
  statistics={statistics}
/>

        <LatestNews
          items={news}
        />

      </main>

    </div>
  );
}