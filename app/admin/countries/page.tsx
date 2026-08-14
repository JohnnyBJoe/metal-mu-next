import { prisma } from "@/lib/prisma";

export default async function AdminCountriesPage() {
  const countries =
    await prisma.system_countries.findMany({
      select: {
        id_c: true,
        text: true,
      },
      orderBy: {
        text: "asc",
      },
    });

  return (
    <main className="min-h-screen bg-zinc-950 px-6 py-8 text-white">
      <div className="mx-auto max-w-5xl">

        <div className="mb-8 flex items-center justify-between">

          <div>
            <h1 className="text-4xl font-bold text-red-500">
              Countries
            </h1>

            <p className="mt-2 text-zinc-400">
              Manage countries.
            </p>
          </div>

          <div className="flex items-center gap-5">

            <a
              href="/admin/countries/new"
              className="rounded bg-red-600 px-4 py-2 text-sm font-semibold text-white hover:bg-red-500"
            >
              + Add Country
            </a>

            <a
              href="/admin"
              className="text-sm text-zinc-400 hover:text-red-500"
            >
              ← Administration
            </a>

          </div>

        </div>

        {countries.length === 0 ? (
          <div className="rounded border border-zinc-800 bg-zinc-900 p-6 text-zinc-400">
            No countries available.
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
                    Country
                  </th>

                </tr>

              </thead>

              <tbody>

                {countries.map((country) => (

                  <tr
                    key={country.id_c}
                    className="border-b border-zinc-800 last:border-0"
                  >

                    <td className="px-4 py-3 text-zinc-500">
                      {country.id_c}
                    </td>

                    <td className="px-4 py-3 font-semibold">
                      {country.text}
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