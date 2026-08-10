import Image from "next/image";

import type { Band } from "@/types/band";
import type { Style } from "@/types/style";
import type { Country } from "@/types/country";

import type { MembersResult } from "@/lib/services/members";
import BandMembers from "@/components/band/BandMembers";

type CenterPanelProps = {
  band: Band | null;
  styles: Style[];
  countries: Country[];
  members: MembersResult;

  letter: string;
  currentPage: number;
};

export default function CenterPanel({
  band,
  styles,
  countries,
  members,
  letter,
  currentPage,
}: CenterPanelProps) {
  if (!band) {
    return (
      <main className="rounded bg-zinc-900 p-6">
        <h1 className="mb-6 text-4xl font-bold text-red-500">
          Metal
        </h1>

        <p className="text-zinc-400">
          Vyberte kapelu v levém panelu.
        </p>
      </main>
    );
  }

  const genreNames = band.styles
    ? band.styles
        .split(",")
        .map((id) => Number(id))
        .filter((id) => id > 0)
        .map(
          (id) =>
            styles.find(
              (style) => style.id_s === id
            )?.text
        )
        .filter(Boolean)
        .slice(0, 3)
    : [];

  const countryName =
    band.country !== null
      ? countries.find(
          (country) =>
            country.id_c === band.country
        )?.text ?? ""
      : "";

  const hasBasicInfo =
    Boolean(band.city) ||
    Boolean(countryName) ||
    genreNames.length > 0 ||
    Boolean(band.date_start) ||
    Boolean(band.date_end) ||
    Boolean(band.homepage);

  return (
    <main className="rounded bg-zinc-900 p-6">

      <h1 className="mb-6 text-4xl font-bold text-red-500">
        {band.name}
      </h1>

      <div className="mb-8 flex gap-8">

        {(band.logo || band.foto) && (
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
        )}

        {hasBasicInfo && (
          <div className="flex-1 space-y-3 text-zinc-300">

            {band.city && (
              <div>
                <strong>City:</strong>{" "}
                {band.city}
              </div>
            )}

            {countryName && (
              <div>
                <strong>Country:</strong>{" "}
                {countryName}
              </div>
            )}

            {genreNames.length > 0 && (
              <div>
                <strong>Genres:</strong>{" "}
                {genreNames.join(", ")}
              </div>
            )}

            {band.date_start && (
              <div>
                <strong>Founded:</strong>{" "}
                {band.date_start.getFullYear()}
              </div>
            )}

            {band.date_end && (
              <div>
                <strong>Disbanded:</strong>{" "}
                {band.date_end.getFullYear()}
              </div>
            )}

            {band.homepage && (
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
            )}

          </div>
        )}

      </div>

      <BandMembers
        current={members.current}
        previous={members.previous}
        letter={letter}
        currentPage={currentPage}
      />

      {band.biografie && (
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
      )}

    </main>
  );
}