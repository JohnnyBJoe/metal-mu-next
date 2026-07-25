import type { Track } from "@/types/track";

type TrackDetailProps = {
  track: Track;
};

export default function TrackDetail({
  track,
}: TrackDetailProps) {
  return (
    <section className="mt-8">
      <h2 className="mb-3 border-b border-zinc-700 pb-2 text-2xl font-semibold text-red-500">
        Track information
      </h2>

      <h3 className="mb-4 text-xl font-semibold text-white">
        {track.name}
      </h3>

      <h4 className="mb-2 font-semibold text-zinc-300">
        Lyrics
      </h4>

      {track.lyric ? (
        <div
          className="prose prose-invert max-w-none text-zinc-300 whitespace-pre-wrap"
          dangerouslySetInnerHTML={{
            __html: track.lyric,
          }}
        />
      ) : (
        <p className="text-zinc-500">
          Lyrics are not available.
        </p>
      )}
    </section>
  );
}