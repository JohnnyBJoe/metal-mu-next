// Metal MU 2.0
// Milestone 1 - Band Detail

import Image from "next/image";

import type { Band } from "@/types/band";
import type { Country } from "@/types/country";
import type { Style } from "@/types/style";

import { formatActiveYears, formatYear } from "@/lib/utils/dates";

type Props = {
  band: Band;
  countries: Country[];
  styles: Style[];
};

export default function BandInfo({
  band,
  countries,
  styles,
}: Props) {
  const country =
    countries.find((c) => c.id_c === band.country)?.text ?? "";

  const genres = band.styles
    .split(",")
    .map(Number)
    .filter(Boolean)
    .map(
      (id) =>
        styles.find((style) => style.id_s === id)?.text
    )
    .filter(Boolean);

  return (
    <>
      <h1 className="mb-8 text-4xl font-bold text-red-500">
        {band.name}
      </h1>

      <div className="mb-10 flex gap-8">

        <div className="w-56 shrink-0">

          {band.logo && (
            <Image
              src={`/logo/${band.logo}`}
              alt={band.name}
              width={220}
              height={120}
              className="mb-5 rounded bg-white p-2 object-contain"
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

        <table className="text-sm text-zinc-300">

          <tbody>

            <tr>
              <td className="pr-6 py-1 font-semibold text-zinc-400">
                Country
              </td>
              <td>{country}</td>
            </tr>

            <tr>
              <td className="pr-6 py-1 font-semibold text-zinc-400">
                City
              </td>
              <td>{band.city}</td>
            </tr>

            <tr>
              <td className="pr-6 py-1 font-semibold text-zinc-400">
                Founded
              </td>
              <td>{formatYear(band.date_start)}</td>
            </tr>

            <tr>
              <td className="pr-6 py-1 font-semibold text-zinc-400">
                Status
              </td>

              <td>
                {band.date_end ? "Split-up" : "Active"}
              </td>

            </tr>

            <tr>
              <td className="pr-6 py-1 font-semibold text-zinc-400">
                Active years
              </td>

              <td>
                {formatActiveYears(
                  band.date_start,
                  band.date_end
                )}
              </td>

            </tr>

            <tr>
              <td className="pr-6 py-1 align-top font-semibold text-zinc-400">
                Genres
              </td>

              <td>{genres.join(", ")}</td>

            </tr>

            <tr>
              <td className="pr-6 py-1 font-semibold text-zinc-400">
                Homepage
              </td>

              <td>

                {band.homepage ? (
                  <a
                    href={band.homepage}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-red-500 hover:underline"
                  >
                    {band.homepage}
                  </a>
                ) : (
                  "-"
                )}

              </td>

            </tr>

          </tbody>

        </table>

      </div>
    </>
  );
}