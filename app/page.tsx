import Header from "@/components/layout/Header";

import Hero from "@/components/home/Hero";
import LatestNews from "@/components/home/LatestNews";
import FeaturedBand from "@/components/home/FeaturedBand";

import { getLatestNews } from "@/lib/services/news";
import LatestReleases from "@/components/home/LatestReleases";

import {
  getLatestAlbumCovers,
} from "@/lib/services/albums";

import {
  getStatistics,
  getTodayActivity,
} from "@/lib/services/home";

import {
  getFeaturedBand,
} from "@/lib/services/bands";

export default async function HomePage() {

  const [
    news,
    statistics,
    activity,
    featuredBand,
    latestAlbums,
  ] = await Promise.all([

    getLatestNews(8),

    getStatistics(),

    getTodayActivity(),

    getFeaturedBand(),

    getLatestAlbumCovers(),

  ]);

  return (
    <div className="min-h-screen bg-zinc-950 text-white">

      <Header />

      <main className="mx-auto max-w-7xl space-y-8 px-6 py-8">

        <Hero
          statistics={statistics}
          activity={activity}
        />

        <LatestNews
          items={news}
        />

        <FeaturedBand
          band={featuredBand}
        />

        <LatestReleases
  items={latestAlbums}
/>

      </main>

    </div>
  );
}