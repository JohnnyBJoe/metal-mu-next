import { prisma } from "@/lib/prisma";

export default async function AdminAdsPage() {
  const ads = await prisma.system_ads.findMany({
    orderBy: {
      id: "desc",
    },
  });

  return (
    <main className="min-h-screen bg-zinc-950 px-6 py-8 text-white">
      <div className="mx-auto max-w-7xl">

        <div className="mb-8 flex items-center justify-between">
          <div>
            <h1 className="text-4xl font-bold text-red-500">
              Advertisements
            </h1>

            <p className="mt-2 text-zinc-400">
              Manage advertising banners.
            </p>
          </div>

          <a
            href="/admin"
            className="text-sm text-zinc-400 hover:text-red-500"
          >
            ← Administration
          </a>
        </div>

        {ads.length === 0 ? (
          <div className="rounded border border-zinc-800 bg-zinc-900 p-6 text-zinc-400">
            No advertisements available.
          </div>
        ) : (
          <div className="overflow-x-auto rounded border border-zinc-800">
            <table className="w-full text-sm">

              <thead className="bg-zinc-900">
                <tr className="border-b border-zinc-800 text-left">
                  <th className="px-4 py-3">Banner</th>
                  <th className="px-4 py-3">URL</th>
                  <th className="px-4 py-3">Impressions</th>
                  <th className="px-4 py-3">CPM</th>
                </tr>
              </thead>

              <tbody>
                {ads.map((ad) => (
                  <tr
                    key={ad.id}
                    className="border-b border-zinc-800 last:border-0"
                  >
                    <td className="px-4 py-3">
                      <div className="mb-2 text-zinc-300">
                        {ad.image}
                      </div>

                      <img
                        src={`/ads/${ad.image}`}
                        alt="Advertisement"
                        width={468}
                        height={60}
                        className="h-[60px] w-[468px] object-cover"
                      />
                    </td>

                    <td className="px-4 py-3 text-zinc-400">
                      {ad.target_url}
                    </td>

                    <td className="px-4 py-3 tabular-nums">
                      <span className="text-white">
                        {ad.impressions}
                      </span>

                      <span className="text-zinc-500">
                        {" "}
                        / {ad.ordered_impressions}
                      </span>
                    </td>

                    <td className="px-4 py-3 tabular-nums text-zinc-300">
                      {ad.cpm.toString()}
                    </td>
                  </tr>
                ))}
              </tbody>

            </table>
          </div>
        )}

      </div>
    </main>
  );
}