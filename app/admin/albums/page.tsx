import { prisma } from "@/lib/prisma";

const albumTypes: Record<number, string> = {
  1: "Studio albums",
  2: "Live albums",
  3: "Compilations",
  4: "Videos",
  5: "EP",
  6: "SP",
  7: "Split",
  8: "Demo",
  9: "Bootlegs",
};

type Props = {
  searchParams: Promise<{
    search?: string;
  }>;
};

export default async function AdminAlbumsPage({
  searchParams,
}: Props) {
  const params = await searchParams;
  const search = params.search?.trim() ?? "";

  const [albums, bands] = await Promise.all([
    prisma.system_discography.findMany({
      where: search
        ? {
            name: {
              contains: search,
            },
          }
        : undefined,

      select: {
        id_d: true,
        interpret: true,
        name: true,
        type: true,
        vydano: true,
        label: true,
      },

      orderBy: {
        name: "asc",
      },

      take: 50,
    }),

    prisma.system_interprets.findMany({
      select: {
        id_i: true,
        name: true,
      },

      orderBy: {
        name: "asc",
      },
    }),
  ]);

  const bandMap = new Map(
    bands.map((band) => [
      band.id_i,
      band.name,
    ])
  );

  return (
    <main className="min-h-screen bg-zinc-950 px-6 py-8 text-white">
      <div className="mx-auto max-w-7xl">

        <div className="mb-8 flex items-center justify-between">

          <div>
            <h1 className="text-4xl font-bold text-red-500">
              Albums
            </h1>

            <p className="mt-2 text-zinc-400">
              Manage albums and releases.
            </p>
          </div>

          <div className="flex items-center gap-5">

            <a
              href="/admin/albums/new"
              className="rounded bg-red-600 px-4 py-2 text-sm font-semibold text-white hover:bg-red-500"
            >
              + Add Album
            </a>

            <a
              href="/admin"
              className="text-sm text-zinc-400 hover:text-red-500"
            >
              ← Administration
            </a>

          </div>

        </div>

        <form
          method="get"
          className="mb-6 flex gap-3"
        >
          <input
            type="search"
            name="search"
            defaultValue={search}
            placeholder="Search album name..."
            className="flex-1 rounded border border-zinc-700 bg-zinc-950 px-4 py-2 text-sm text-white placeholder:text-zinc-600 focus:border-red-600 focus:outline-none"
          />

          <button
            type="submit"
            className="rounded bg-red-600 px-5 py-2 text-sm font-semibold text-white hover:bg-red-500"
          >
            Search
          </button>

          {search && (
            <a
              href="/admin/albums"
              className="rounded border border-zinc-700 px-5 py-2 text-sm text-zinc-400 hover:border-zinc-500 hover:text-white"
            >
              Clear
            </a>
          )}
        </form>

        {search && (
          <p className="mb-4 text-sm text-zinc-500">
            Search results for:{" "}
            <span className="text-zinc-300">
              {search}
            </span>
          </p>
        )}

        {albums.length === 0 ? (
          <div className="rounded border border-zinc-800 bg-zinc-900 p-6 text-zinc-400">
            {search
              ? "No albums found."
              : "No albums available."}
          </div>
        ) : (
          <div className="overflow-x-auto rounded border border-zinc-800">

            <table className="w-full text-sm">

              <thead className="bg-zinc-900">

                <tr className="border-b border-zinc-800 text-left">

                  <th className="px-4 py-3">
                    ID
                  </th>

                  <th className="px-4 py-3">
                    Album
                  </th>

                  <th className="px-4 py-3">
                    Band
                  </th>

                  <th className="px-4 py-3">
                    Type
                  </th>

                  <th className="px-4 py-3">
                    Released
                  </th>

                  <th className="px-4 py-3">
                    Label
                  </th>

                  <th className="px-4 py-3">
                    Actions
                  </th>

                </tr>

              </thead>

              <tbody>

                {albums.map((album) => (

                  <tr
                    key={album.id_d}
                    className="border-b border-zinc-800 last:border-0"
                  >

                    <td className="px-4 py-3 text-zinc-500">
                      {album.id_d}
                    </td>

                    <td className="px-4 py-3 font-semibold">
                      {album.name}
                    </td>

                    <td className="px-4 py-3 text-zinc-400">
                      {bandMap.get(
                        album.interpret
                      ) ??
                        `Unknown (${album.interpret})`}
                    </td>

                    <td className="px-4 py-3 text-zinc-400">
                      {albumTypes[album.type] ??
                        `Unknown (${album.type})`}
                    </td>

                    <td className="px-4 py-3 text-zinc-400">
                      {album.vydano ?? ""}
                    </td>

                    <td className="px-4 py-3 text-zinc-400">
                      {album.label}
                    </td>

                    <td className="px-4 py-3">

                      <a
                        href={`/admin/albums/${album.id_d}/edit`}
                        className="inline-block rounded border border-zinc-700 px-3 py-1.5 text-xs font-semibold text-zinc-300 hover:border-red-600 hover:text-red-500"
                      >
                        Edit
                      </a>

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