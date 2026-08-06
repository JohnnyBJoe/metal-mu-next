import Header from "@/components/layout/Header";

import NewsMenu from "@/components/news/NewsMenu";
import NewsList from "@/components/news/NewsList";

import { getLatestAlbums } from "@/lib/services/news";

export default async function NewReleasesPage() {
  const albums = await getLatestAlbums(100);

  return (
    <div className="min-h-screen bg-zinc-950 text-white">

      <Header />

      <main className="mx-auto max-w-7xl px-6 py-8">

        <NewsMenu active="new-releases" />

        <NewsList
          title="New Releases"
          items={albums}
        />

      </main>

    </div>
  );
}