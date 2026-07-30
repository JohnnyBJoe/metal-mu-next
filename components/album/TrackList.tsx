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
      <h2 className="mb-2 border-b border-zinc-700 pb-1 text-2xl font-semibold text-red-500">
        Tracklist
      </h2>

      <ol className="divide-y divide-zinc-800">
        {tracks.map((track, index) => {
          const href =
            baseUrl === "/"
              ? `/?letter=${letter}&page=${currentPage}&band=${bandId}&album=${albumId}&track=${track.id_t}`
              : `${baseUrl}?letter=${letter}&page=${currentPage}&person=${personId}&album=${albumId}&track=${track.id_t}`;

          return (
            <li
              key={track.id_t}
              className="flex items-center gap-2 py-0.5 text-sm"
            >
              <span className="w-7 text-right tabular-nums text-zinc-500">
                {index + 1}.
              </span>

              <Link
                href={href}
                className="flex-1 text-zinc-300 transition-colors hover:text-red-500"
              >
                {track.name}
              </Link>

              {/* Rezerva pro budoucí délku skladby */}
              <span className="w-12 text-right tabular-nums text-xs text-zinc-500">
                {/* {track.length} */}
              </span>
            </li>
          );
        })}
      </ol>
    </section>
  );
}