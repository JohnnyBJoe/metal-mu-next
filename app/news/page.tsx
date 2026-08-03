import Header from "@/components/layout/Header";

import NewsSection from "@/components/news/NewsSection";

import {
  getLatestBands,
  getUpdatedBands,
  getLatestAlbums,
  getUpdatedAlbums,
  getLatestMembers,
  getUpdatedMembers,
} from "@/lib/services/news";

export default async function NewsPage() {

  const bands = await getLatestBands(10);
  const updatedBands = await getUpdatedBands(10);

  const albums = await getLatestAlbums(10);
  const updatedAlbums = await getUpdatedAlbums(10);
  const members = await getLatestMembers(10);
  const updatedMembers = await getUpdatedMembers(10);
  return (
    <div className="min-h-screen bg-zinc-950 text-white">

      <Header />

      <main className="mx-auto max-w-7xl px-6 py-8">

        <h1 className="mb-8 text-4xl font-bold text-red-500">
          News & Updates
        </h1>

        <NewsSection
          title="New Bands"
          moreHref="/news/new-bands"
          items={bands}
        />

        <NewsSection
          title="Updated Bands"
          moreHref="/news/updated-bands"
          items={updatedBands}
        />

        <NewsSection
          title="New Releases"
          moreHref="/news/new-releases"
          items={albums}
        />

        <NewsSection
          title="Updated Releases"
          moreHref="/news/updated-releases"
          items={updatedAlbums}
        />
<NewsSection
  title="New Musicians"
  moreHref="/news/new-musicians"
  items={members}
/>

<NewsSection
  title="Updated Musicians"
  moreHref="/news/updated-musicians"
  items={updatedMembers}
/>
      </main>

    </div>
  );
}