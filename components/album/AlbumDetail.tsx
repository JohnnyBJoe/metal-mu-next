import Image from "next/image";

import type { Album } from "@/types/album";
import type { Track } from "@/types/track";

import TrackList from "@/components/album/TrackList";

type AlbumDetailProps = {
  album: Album;
  tracks: Track[];
};

const TYPES: Record<number, string> = {
  1: "Studio album",
  2: "Live album",
  3: "Compilation",
  4: "EP",
  5: "Single",
  6: "Demo",
  7: "Video",
  8: "Bootleg",
};

export default function AlbumDetail({
  album,
  tracks,
}: AlbumDetailProps) {
  return (
    <main className="rounded bg-zinc-900 p-6">
      <h1 className="mb-6 text-4xl font-bold text-red-500">
        {album.name}
      </h1>

      <div className="flex gap-8">
        <div className="w-64 flex-shrink-0">
          {album.obal && (
            <Image
              src={`/cover/${album.obal}`}
              alt={album.name}
              width={250}
              height={250}
              className="rounded"
            />
          )}
        </div>

        <div className="flex-1 space-y-3 text-zinc-300">
          <div>
            <strong>Released:</strong> {album.vydano ?? "Unknown"}
          </div>

          <div>
            <strong>Type:</strong> {TYPES[album.type] ?? "Other"}
          </div>

          <div>
            <strong>Label:</strong> {album.label || "Unknown"}
          </div>
        </div>
      </div>

      {album.info && (
        <section className="mt-8">
          <h2 className="mb-3 border-b border-zinc-700 pb-2 text-2xl font-semibold text-red-500">
            Album information
          </h2>

          <div
            className="prose prose-invert max-w-none text-zinc-300"
            dangerouslySetInnerHTML={{
              __html: album.info,
            }}
          />
        </section>
      )}

      <TrackList tracks={tracks} />
    </main>
  );
}