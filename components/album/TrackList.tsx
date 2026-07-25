import Link from "next/link";

import type { Track } from "@/types/track";

type TrackListProps = {
  letter: string;
  bandId: number;
  albumId: number;
  tracks: Track[];
};

export default function TrackList({
  letter,
  bandId,
  albumId,
  tracks,
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
        {tracks.map((track, index) => (
          <li
            key={track.id_t}
            className="flex gap-3 rounded border border-zinc-800 bg-zinc-950 px-4 py-2"
          >
            <span className="w-8 text-right text-zinc-500">
              {index + 1}.
            </span>

            <Link
              href={`/?letter=${letter}&band=${bandId}&album=${albumId}&track=${track.id_t}`}
              className="flex-1 text-zinc-300 hover:text-red-500"
            >
              {track.name}
            </Link>
          </li>
        ))}
      </ol>
    </section>
  );
}