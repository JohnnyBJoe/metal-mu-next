export default function AdminPage() {
  return (
    <main className="min-h-screen bg-zinc-950 px-6 py-8 text-white">
      <div className="mx-auto max-w-7xl">

        <h1 className="mb-8 text-4xl font-bold text-red-500">
          Administration
        </h1>

        <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-4">

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

        </div>

      </div>
    </main>
  );
}