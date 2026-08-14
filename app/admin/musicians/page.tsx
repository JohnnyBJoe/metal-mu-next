import { prisma } from "@/lib/prisma";
import MusicianSearch from "./MusicianSearch";

type Props = {
  searchParams: Promise<{
    search?: string;
  }>;
};

export default async function AdminMusiciansPage({
  searchParams,
}: Props) {
  const params = await searchParams;
  const search = params.search?.trim() ?? "";

  const [musicians, bands] = await Promise.all([
    prisma.system_interprets_members.findMany({
      where: search
        ? {
            name: {
              contains: search,
            },
          }
        : undefined,

      select: {
        id_m: true,
        name: true,
        real_name: true,
        instrument: true,
        interpret: true,
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
              Musicians
            </h1>

            <p className="mt-2 text-zinc-400">
              Manage musicians.
            </p>
          </div>

          <div className="flex items-center gap-5">

            <a
              href="/admin/musicians/new"
              className="rounded bg-red-600 px-4 py-2 text-sm font-semibold text-white hover:bg-red-500"
            >
              + Add Musician
            </a>

            <a
              href="/admin"
              className="text-sm text-zinc-400 hover:text-red-500"
            >
              ← Administration
            </a>

          </div>

        </div>

        <MusicianSearch
          initialSearch={search}
        />

        {search && (
          <p className="mb-4 text-sm text-zinc-500">
            Search results for:{" "}
            <span className="text-zinc-300">
              {search}
            </span>
          </p>
        )}

        {musicians.length === 0 ? (
          <div className="rounded border border-zinc-800 bg-zinc-900 p-6 text-zinc-400">
            {search
              ? "No musicians found."
              : "No musicians available."}
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
                    Name
                  </th>

                  <th className="px-4 py-3">
                    Real name
                  </th>

                  <th className="px-4 py-3">
                    Instrument
                  </th>

                  <th className="px-4 py-3">
                    Band
                  </th>

                  <th className="px-4 py-3">
                    Actions
                  </th>

                </tr>

              </thead>

              <tbody>

                {musicians.map((musician) => (

                  <tr
                    key={musician.id_m}
                    className="border-b border-zinc-800 last:border-0"
                  >

                    <td className="px-4 py-3 text-zinc-500">
                      {musician.id_m}
                    </td>

                    <td className="px-4 py-3 font-semibold">
                      {musician.name}
                    </td>

                    <td className="px-4 py-3 text-zinc-400">
                      {musician.real_name}
                    </td>

                    <td className="px-4 py-3 text-zinc-400">
                      {musician.instrument}
                    </td>

                    <td className="px-4 py-3 text-zinc-400">
                      {bandMap.get(
                        musician.interpret
                      ) ??
                        `Unknown (${musician.interpret})`}
                    </td>

                    <td className="px-4 py-3">

                      <a
                        href={`/admin/musicians/${musician.id_m}/edit`}
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