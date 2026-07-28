import Link from "next/link";

import Header from "@/components/layout/Header";

import { getCountries } from "@/lib/services/countries";

export default async function CountriesPage() {
  const countries = await getCountries();

  return (
    <div className="min-h-screen bg-zinc-950 text-white">
      <Header />

      <main className="mx-auto max-w-7xl px-6 py-10">
        <h1 className="mb-8 text-4xl font-bold text-red-500">
          Countries
        </h1>

        <div className="grid gap-1">

          {countries.map((country) => (

            <Link
              key={country.id_c}
              href={`/country/${country.id_c}`}
              className="flex items-center justify-between rounded px-3 py-2 transition hover:bg-zinc-800"
            >
              <span>{country.text}</span>

              <span className="text-sm text-zinc-500">
                {country.bands}
              </span>

            </Link>

          ))}

        </div>
      </main>
    </div>
  );
}