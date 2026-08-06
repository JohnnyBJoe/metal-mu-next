import Header from "@/components/layout/Header";

import NewsMenu from "@/components/news/NewsMenu";
import NewsList from "@/components/news/NewsList";

import { getUpdatedBands } from "@/lib/services/news";

export default async function UpdatedBandsPage() {
  const bands = await getUpdatedBands(100);

  return (
    <div className="min-h-screen bg-zinc-950 text-white">

      <Header />

      <main className="mx-auto max-w-7xl px-6 py-8">

        <NewsMenu active="updated-bands" />

        <NewsList
          title="Updated Bands"
          items={bands}
        />

      </main>

    </div>
  );
}