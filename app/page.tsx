import Header from "@/components/layout/Header";

import Hero from "@/components/home/Hero";
import LatestNews from "@/components/home/LatestNews";
import BandOfTheDay from "@/components/home/BandOfTheDay";
import LatestReleases from "@/components/home/LatestReleases";

import { getLatestNews } from "@/lib/services/news";
import { getLatestAlbumCovers } from "@/lib/services/albums";

import {
  getStatistics,
  getTodayActivity,
} from "@/lib/services/home";

import {
  getBandOfTheDay,
} from "@/lib/services/bands";

export default async function HomePage() {
  const [
    news,
    statistics,
    activity,
    bandOfTheDay,
    latestAlbums,
  ] = await Promise.all([
    getLatestNews(8),
    getStatistics(),
    getTodayActivity(),
    getBandOfTheDay(),
    getLatestAlbumCovers(5),
  ]);

  return (
    <div className="min-h-screen bg-zinc-950 text-white">

      <Header home />

      <main className="mx-auto max-w-7xl space-y-8 px-6 py-8">

        <Hero
          statistics={statistics}
          activity={activity}
        />

        <LatestNews
          items={news}
        />

        <div className="grid gap-8 xl:grid-cols-[1fr_1.35fr]">

          <BandOfTheDay
            band={bandOfTheDay}
          />

          <LatestReleases
            items={latestAlbums}
          />

        </div>

      </main>

    </div>
  );
}