import Link from "next/link";

import Header from "@/components/layout/Header";

import { getGenres } from "@/lib/services/styles";

export default async function GenresPage() {

  const genres = await getGenres();

  return (
    <div className="min-h-screen bg-zinc-950 text-white">

      <Header />

      <main className="mx-auto max-w-7xl px-6 py-10">

        <h1 className="mb-8 text-4xl font-bold text-red-500">
          Genres
        </h1>

        <div className="grid gap-2">

          {genres.map((genre) => (

            <Link
              key={genre.id_s}
              href={`/genre/${genre.id_s}`}
              className="rounded px-3 py-2 transition hover:bg-zinc-800 hover:text-red-500"
            >
              {genre.text}
            </Link>

          ))}

        </div>

      </main>

    </div>
  );
}