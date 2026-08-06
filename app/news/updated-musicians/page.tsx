import Header from "@/components/layout/Header";

import NewsMenu from "@/components/news/NewsMenu";
import NewsList from "@/components/news/NewsList";

import { getUpdatedMembers } from "@/lib/services/news";

export default async function UpdatedMusiciansPage() {
  const members = await getUpdatedMembers(100);

  return (
    <div className="min-h-screen bg-zinc-950 text-white">

      <Header />

      <main className="mx-auto max-w-7xl px-6 py-8">

        <NewsMenu active="updated-musicians" />

        <NewsList
          title="Updated Musicians"
          items={members}
        />

      </main>

    </div>
  );
}