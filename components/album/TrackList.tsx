import Link from "next/link";

import type { Track } from "@/types/track";

type TrackListProps = {
  letter: string;
  bandId: number;
  albumId: number;
  tracks: Track[];

  baseUrl?: string;
  personId?: number;
  currentPage?: number;
};

export default function TrackList({
  letter,
  bandId,
  albumId,
  tracks,

  baseUrl = "/",
  personId,
  currentPage = 1,
}: TrackListProps) {

  if (tracks.length === 0) {
    return null;
  }

  return (
    <section className="mt-8">

      <h2 className="mb-3 border-b border-zinc-700 pb-2 text-2xl font-semibold text-red-500">
        Tracklist
      </h2>

      <ol className="space-y-2">

        {tracks.map((track, index) => {

          const href =
            baseUrl === "/"
              ? `/?letter=${letter}&page=${currentPage}&band=${bandId}&album=${albumId}&track=${track.id_t}`
              : `${baseUrl}?letter=${letter}&page=${currentPage}&person=${personId}&album=${albumId}&track=${track.id_t}`;

          return (
            <li
              key={track.id_t}
              className="flex gap-3 rounded border border-zinc-800 bg-zinc-950 px-4 py-2"
            >
              <span className="w-8 text-right text-zinc-500">
                {index + 1}.
              </span>

              <Link
                href={href}
                className="flex-1 text-zinc-300 hover:text-red-500"
              >
                {track.name}
              </Link>
            </li>
          );
        })}

      </ol>

    </section>
  );
}