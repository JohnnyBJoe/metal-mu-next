import Header from "@/components/layout/Header";
import NewsList from "@/components/news/NewsList";

import { getLatestBands } from "@/lib/services/news";

export default async function NewBandsPage() {

  const bands = await getLatestBands(100);

  return (
    <div className="min-h-screen bg-zinc-950 text-white">

      <Header />

      <main className="mx-auto max-w-7xl px-6 py-8">

        <h1 className="mb-8 text-4xl font-bold text-red-500">
          News & Updates
        </h1>

        <NewsList
          title="New Bands"
          items={bands}
        />

      </main>

    </div>
  );
}