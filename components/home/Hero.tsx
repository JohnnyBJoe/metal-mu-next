import Link from "next/link";

type HeroProps = {
  statistics: {
    bands: number;
    releases: number;
    musicians: number;
  };

  activity: {
    bands: number;
    releases: number;
    musicians: number;
  };
};

export default function Hero({
  statistics,
  activity,
}: HeroProps) {
  return (
    <section className="overflow-hidden rounded-xl border border-zinc-800 bg-gradient-to-b from-zinc-900 via-zinc-900 to-black">

      <div className="px-8 py-12 text-center">

        <h1 className="text-5xl font-extrabold tracking-wide text-white">
          Rock &amp; Metal Book
        </h1>

        <p className="mt-4 text-xl text-zinc-300">
          The encyclopedia of Rock &amp; Metal music
        </p>

        <p className="mt-2 text-sm text-zinc-500">
          Discover thousands of bands, musicians, releases and lyrics from around the world.
        </p>

        {/* Statistics */}
        <div className="mt-8 text-sm font-medium text-zinc-400">

          <span>
            {statistics.bands.toLocaleString("en-US")} Bands
          </span>

          <span className="mx-3 text-zinc-600">•</span>

          <span>
            {statistics.releases.toLocaleString("en-US")} Releases
          </span>

          <span className="mx-3 text-zinc-600">•</span>

          <span>
            {statistics.musicians.toLocaleString("en-US")} Musicians
          </span>

        </div>

        {/* Today's Activity */}
        <div className="mt-6">

          <div className="text-xs font-semibold uppercase tracking-[0.2em] text-zinc-500">
            Today's Activity
          </div>

          <div className="mt-2 text-sm text-white">

            {activity.bands} Bands

            <span className="mx-2 text-zinc-500">•</span>

            {activity.releases} Releases

            <span className="mx-2 text-zinc-500">•</span>

            {activity.musicians} Musicians

          </div>

        </div>

        {/* Buttons */}
        <div className="mt-10 flex flex-wrap justify-center gap-4">

          <Link
            href="/bands?letter=A"
            className="rounded bg-red-700 px-6 py-3 font-semibold text-white transition hover:bg-red-600"
          >
            Explore Bands
          </Link>

          <Link
            href="/persons?letter=A"
            className="rounded border border-zinc-700 px-6 py-3 font-semibold text-zinc-300 transition hover:border-red-600 hover:text-white"
          >
            Explore Musicians
          </Link>

        </div>

      </div>

    </section>
  );
}