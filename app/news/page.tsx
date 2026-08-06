import Header from "@/components/layout/Header";

import NewsMenu from "@/components/news/NewsMenu";
import NewsList from "@/components/news/NewsList";

import { getLatestNews } from "@/lib/services/news";

export default async function NewsPage() {

  const news = await getLatestNews(100);

  return (
    <div className="min-h-screen bg-zinc-950 text-white">

      <Header />

      <main className="mx-auto max-w-7xl px-6 py-8">

        <NewsMenu active="all" />

        <NewsList
  title="All Updates"
  items={news}
/>

      </main>

    </div>
  );
}