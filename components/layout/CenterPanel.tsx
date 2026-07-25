import Image from "next/image";

import type { Band } from "@/types/band";
import type { Style } from "@/types/style";
import type { Country } from "@/types/country";
import type { Member } from "@/types/member";

import type { MembersResult } from "@/lib/services/members";
import BandMembers from "@/components/band/BandMembers";

type CenterPanelProps = {
  band: Band | null;
  styles: Style[];
  countries: Country[];
  members: MembersResult;
};

export default function CenterPanel({
  band,
  styles,
  countries,
  members,
}: CenterPanelProps) {
  if (!band) {
    return (
      <main className="rounded bg-zinc-900 p-6">
        <h2 className="mb-4 text-2xl font-bold text-red-500">
          Metal MU
        </h2>

        <p className="text-zinc-400">
          Vyberte kapelu v levém panelu.
        </p>
      </main>
    );
  }

  const genreNames = band.styles
    .split(",")
    .map((id) => Number(id))
    .filter((id) => id > 0)
    .map((id) => styles.find((style) => style.id_s === id)?.text)
    .filter(Boolean);

  const countryName =
    countries.find((country) => country.id_c === band.country)?.text ?? "";

  return (
    <main className="rounded bg-zinc-900 p-6">

      <h1 className="mb-6 text-4xl font-bold text-red-500">
        {band.name}
      </h1>

      <div className="mb-8 flex gap-8">

        <div className="w-56 flex-shrink-0">

          {band.logo && (
            <Image
              src={`/logo/${band.logo}`}
              alt={band.name}
              width={220}
              height={120}
              className="mb-4 rounded bg-white p-2 object-contain"
            />
          )}

          {band.foto && (
            <Image
              src={`/foto/${band.foto}`}
              alt={band.name}
              width={220}
              height={220}
              className="rounded object-cover"
            />
          )}

        </div>

        <div className="flex-1 space-y-3 text-zinc-300">

          <div>
            <strong>City:</strong> {band.city}
          </div>

          <div>
            <strong>Country:</strong> {countryName}
          </div>

          <div>
            <strong>Genres:</strong> {genreNames.join(", ")}
          </div>
<div>
  <strong>Founded:</strong>{" "}
  {band.date_start
    ? band.date_start.getFullYear()
    : "Unknown"}
</div>

<div>
  <strong>Disbanded:</strong>{" "}
  {band.date_end
    ? band.date_end.getFullYear()
    : "Active"}
</div>
          <div>
            <strong>Homepage:</strong>{" "}
            <a
              href={band.homepage}
              target="_blank"
              rel="noopener noreferrer"
              className="text-red-500 hover:underline"
            >
              {band.homepage}
            </a>
          </div>

        </div>

      </div>

      <BandMembers
  current={members.current}
  previous={members.previous}
/>

      <section>
        <h2 className="mb-3 border-b border-zinc-700 pb-2 text-2xl font-semibold text-red-500">
          Biography
        </h2>

        <div
          className="prose prose-invert max-w-none text-zinc-300"
          dangerouslySetInnerHTML={{
            __html: band.biografie,
          }}
        />
      </section>

    </main>
  );
}