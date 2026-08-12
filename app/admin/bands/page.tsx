import { prisma } from "@/lib/prisma";
import BandSearch from "./BandSearch";

type Props = {
  searchParams: Promise<{
    search?: string;
  }>;
};

export default async function AdminBandsPage({
  searchParams,
}: Props) {
  const params = await searchParams;
  const search = params.search?.trim() ?? "";

  const [bands, countries, genres] = await Promise.all([
    prisma.system_interprets.findMany({
      where: search
        ? {
            name: {
              contains: search,
            },
          }
        : undefined,

      select: {
        id_i: true,
        name: true,
        country: true,
        city: true,
        styles: true,
      },

      orderBy: {
        name: "asc",
      },

      take: 50,
    }),

    prisma.system_countries.findMany({
      select: {
        id_c: true,
        text: true,
      },

      orderBy: {
        text: "asc",
      },
    }),

    prisma.system_styles.findMany({
      select: {
        id_s: true,
        text: true,
      },

      orderBy: {
        text: "asc",
      },
    }),
  ]);

  const countryMap = new Map(
    countries.map((country) => [
      String(country.id_c),
      country.text,
    ])
  );

  const genreMap = new Map(
    genres.map((genre) => [
      String(genre.id_s),
      genre.text,
    ])
  );

  function getGenreNames(styles: string) {
    const names = styles
      .split(",")
      .map((id) => id.trim())
      .filter((id) => id && id !== "0")
      .map(
        (id) =>
          genreMap.get(id) ?? `Unknown (${id})`
      );

    return names.length > 0
      ? names.join(", ")
      : "—";
  }

  return (
    <main className="min-h-screen bg-zinc-950 px-6 py-8 text-white">
      <div className="mx-auto max-w-7xl">

        <div className="mb-8 flex items-center justify-between">

          <div>
            <h1 className="text-4xl font-bold text-red-500">
              Bands
            </h1>

            <p className="mt-2 text-zinc-400">
              Manage bands.
            </p>
          </div>

          <div className="flex items-center gap-5">

            <a
              href="/admin/bands/new"
              className="rounded bg-red-600 px-4 py-2 text-sm font-semibold text-white hover:bg-red-500"
            >
              + Add Band
            </a>

            <a
              href="/admin"
              className="text-sm text-zinc-400 hover:text-red-500"
            >
              ← Administration
            </a>

          </div>

        </div>

        <BandSearch initialSearch={search} />

        {search && (
          <p className="mb-4 text-sm text-zinc-500">
            Search results for:{" "}
            <span className="text-zinc-300">
              {search}
            </span>
          </p>
        )}

        {bands.length === 0 ? (
          <div className="rounded border border-zinc-800 bg-zinc-900 p-6 text-zinc-400">
            {search
              ? "No bands found."
              : "No bands available."}
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
                    Country
                  </th>

                  <th className="px-4 py-3">
                    City
                  </th>

                  <th className="px-4 py-3">
                    Genre
                  </th>

                  <th className="px-4 py-3">
                    Actions
                  </th>

                </tr>

              </thead>

              <tbody>

                {bands.map((band) => (

                  <tr
                    key={band.id_i}
                    className="border-b border-zinc-800 last:border-0"
                  >

                    <td className="px-4 py-3 text-zinc-500">
                      {band.id_i}
                    </td>

                    <td className="px-4 py-3 font-semibold">
                      {band.name}
                    </td>

                    <td className="px-4 py-3 text-zinc-400">
                      {countryMap.get(
                        String(band.country)
                      ) ??
                        `Unknown (${band.country})`}
                    </td>

                    <td className="px-4 py-3 text-zinc-400">
                      {band.city}
                    </td>

                    <td className="px-4 py-3 text-zinc-400">
                      {getGenreNames(band.styles)}
                    </td>

                    <td className="px-4 py-3">

                      <a
                        href={`/admin/bands/${band.id_i}/edit`}
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