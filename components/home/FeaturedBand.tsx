import Link from "next/link";

type FeaturedBandProps = {
  band: {
    id_i: number;
    name: string;
    city: string | null;
    country: number | null;
    styles: string | null;
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
      .trim()
      .slice(0, 260);

  return (
    <section className="rounded-xl border border-zinc-800 bg-zinc-900 p-6">

      <div className="mb-4 flex items-center gap-2">

        <span className="text-xl">
          ⭐
        </span>

        <h2 className="text-xl font-bold text-red-500">
          Featured Band
        </h2>

      </div>

      <h3 className="text-3xl font-bold text-white">
        {band.name}
      </h3>

      <div className="mt-2 text-sm text-zinc-400">

        {band.city && (
          <span>{band.city}</span>
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