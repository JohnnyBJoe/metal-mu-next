export default function AdminPage() {
  return (
    <main className="min-h-screen bg-zinc-950 px-6 py-8 text-white">
      <div className="mx-auto max-w-7xl">

        <div className="mb-8">
          <h1 className="text-4xl font-bold text-red-500">
            Administration
          </h1>

          <p className="mt-2 text-zinc-400">
            Manage Rock&Metal Book.
          </p>
        </div>

        <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-4">

          <a
            href="/admin/bands"
            className="rounded border border-zinc-800 bg-zinc-900 p-6 transition hover:border-red-600 hover:bg-zinc-800"
          >
            <h2 className="mb-2 text-xl font-semibold">
              Bands
            </h2>

            <p className="text-sm text-zinc-400">
              Manage bands and their information.
            </p>
          </a>

          <a
            href="/admin/musicians"
            className="rounded border border-zinc-800 bg-zinc-900 p-6 transition hover:border-red-600 hover:bg-zinc-800"
          >
            <h2 className="mb-2 text-xl font-semibold">
              Musicians
            </h2>

            <p className="text-sm text-zinc-400">
              Manage musicians and band members.
            </p>
          </a>

          <a
            href="/admin/albums"
            className="rounded border border-zinc-800 bg-zinc-900 p-6 transition hover:border-red-600 hover:bg-zinc-800"
          >
            <h2 className="mb-2 text-xl font-semibold">
              Albums
            </h2>

            <p className="text-sm text-zinc-400">
              Manage albums and releases.
            </p>
          </a>

          <a
            href="/admin/news"
            className="rounded border border-zinc-800 bg-zinc-900 p-6 transition hover:border-red-600 hover:bg-zinc-800"
          >
            <h2 className="mb-2 text-xl font-semibold">
              News
            </h2>

            <p className="text-sm text-zinc-400">
              Manage news and updates.
            </p>
          </a>

          <a
            href="/admin/ads"
            className="rounded border border-zinc-800 bg-zinc-900 p-6 transition hover:border-red-600 hover:bg-zinc-800"
          >
            <h2 className="mb-2 text-xl font-semibold">
              Advertisements
            </h2>

            <p className="text-sm text-zinc-400">
              Manage advertising banners and impressions.
            </p>
          </a>

          <a
            href="/admin/countries"
            className="rounded border border-zinc-800 bg-zinc-900 p-6 transition hover:border-red-600 hover:bg-zinc-800"
          >
            <h2 className="mb-2 text-xl font-semibold">
              Countries
            </h2>

            <p className="text-sm text-zinc-400">
              Manage countries.
            </p>
          </a>

          <a
            href="/admin/genres"
            className="rounded border border-zinc-800 bg-zinc-900 p-6 transition hover:border-red-600 hover:bg-zinc-800"
          >
            <h2 className="mb-2 text-xl font-semibold">
              Genres
            </h2>

            <p className="text-sm text-zinc-400">
              Manage music genres.
            </p>
          </a>

          <a
            href="/admin/other"
            className="rounded border border-zinc-800 bg-zinc-900 p-6 transition hover:border-red-600 hover:bg-zinc-800"
          >
            <h2 className="mb-2 text-xl font-semibold">
              Other
            </h2>

            <p className="text-sm text-zinc-400">
              Magazines, Webzines, Studios and other content.
            </p>
          </a>

        </div>

      </div>
    </main>
  );
}