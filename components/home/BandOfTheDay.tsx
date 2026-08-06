import Link from "next/link";

type FeaturedBandProps = {
  band: {
    id_i: number;
    name: string;
    country: string;
    styles: string;
    date_start: number | null;
    biografie: string | null;
  } | null;
};

export default function FeaturedBand({
  band,
}: FeaturedBandProps) {

  if (!band) {
    return null;
  }

  const biography =
    band.biografie
      ?.replace(/<[^>]+>/g, "")
      .replace(/\s+/g, " ")
      .trim()
      .slice(0, 140);

  return (
    <section className="rounded-xl border border-zinc-800 bg-zinc-900 p-6">

      <div className="mb-4">

        <span className="rounded bg-red-700 px-2 py-1 text-xs font-bold uppercase tracking-wider text-white">
          Band Of The Day
        </span>

      </div>

      <h3 className="text-3xl font-bold text-white">
        {band.name}
      </h3>

      <div className="mt-2 text-sm text-zinc-400">

        {band.country && (
          <span>{band.country}</span>
        )}

        {band.styles && (
          <>
            <span className="mx-2">•</span>
            <span>{band.styles}</span>
          </>
        )}

        {band.date_start && (
          <>
            <span className="mx-2">•</span>
            <span>Founded {band.date_start}</span>
          </>
        )}

      </div>

      {biography && (

        <p className="mt-5 leading-7 text-zinc-300">
          {biography}
          ...
        </p>

      )}

      <div className="mt-6">

        <Link
          href={`/bands?band=${band.id_i}`}
          className="rounded bg-red-700 px-5 py-2 font-semibold text-white transition hover:bg-red-600"
        >
          Explore Band
        </Link>

      </div>

    </section>
  );
}