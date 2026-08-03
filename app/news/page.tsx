import Link from "next/link";

import Header from "@/components/layout/Header";

import {
  getLatestBands,
  getUpdatedBands,
} from "@/lib/services/news";

export default async function NewsPage() {
  const bands = await getLatestBands(10);
  const updatedBands = await getUpdatedBands(10);
  return (
    <div className="min-h-screen bg-zinc-950 text-white">

      <Header />

      <main className="mx-auto max-w-7xl px-6 py-8">

        <h1 className="mb-8 text-4xl font-bold text-red-500">
          News & Updates
        </h1>

        <section className="rounded bg-zinc-900 p-6">

          <div className="mb-6 flex items-center justify-between">

            <h2 className="text-2xl font-bold text-red-500">
              New Bands
            </h2>

            <Link
              href="/news/new-bands"
              className="text-sm text-zinc-400 hover:text-red-500"
            >
              More →
            </Link>

          </div>

          <ul className="space-y-3">

            {bands.map((band) => (

              <li
                key={band.id}
                className="border-b border-zinc-800 pb-3"
              >

                <Link
                  href={`/?band=${band.id}`}
                  className="text-white hover:text-red-500"
                >
                  {band.title}
                </Link>

                <div className="text-sm text-zinc-500">

                  {band.subtitle}

                </div>

                <div className="text-xs text-zinc-600">

                  {band.date.toLocaleDateString("cs-CZ")}

                </div>

              </li>

            ))}

          </ul>

        </section>
<section className="mt-8 rounded bg-zinc-900 p-6">

  <div className="mb-6 flex items-center justify-between">

    <h2 className="text-2xl font-bold text-red-500">
      Updated Bands
    </h2>

    <Link
      href="/news/updated-bands"
      className="text-sm text-zinc-400 hover:text-red-500"
    >
      More →
    </Link>

  </div>

  <ul className="space-y-3">

    {updatedBands.map((band) => (

      <li
        key={band.id}
        className="border-b border-zinc-800 pb-3"
      >

        <Link
          href={`/?band=${band.id}`}
          className="text-white hover:text-red-500"
        >
          {band.title}
        </Link>

        <div className="text-sm text-zinc-500">
          {band.subtitle}
        </div>

        <div className="text-xs text-zinc-600">
          {band.date.toLocaleDateString("cs-CZ")}
        </div>

      </li>

    ))}

  </ul>

</section>
      </main>

    </div>
  );
}