import { prisma } from "@/lib/prisma";
import { notFound } from "next/navigation";

import EditBandForm from "./EditBandForm";

type Props = {
  params: Promise<{
    id: string;
  }>;
};

function formatDateForInput(
  date: Date | null
): string {
  if (!date) {
    return "";
  }

  const year = date.getFullYear();
  const month = date.getMonth() + 1;
  const day = date.getDate();

  if (
    year < 1 ||
    year > 9999 ||
    month < 1 ||
    month > 12 ||
    day < 1 ||
    day > 31
  ) {
    return "";
  }

  return [
    String(year).padStart(4, "0"),
    String(month).padStart(2, "0"),
    String(day).padStart(2, "0"),
  ].join("-");
}

export default async function EditBandPage({
  params,
}: Props) {
  const { id } = await params;

  const bandId = Number(id);

  if (!Number.isInteger(bandId)) {
    notFound();
  }

  const [band, countries, genres] =
    await Promise.all([
      prisma.system_interprets.findUnique({
        where: {
          id_i: bandId,
        },
        select: {
          id_i: true,
          name: true,
          city: true,
          country: true,
          styles: true,
          homepage: true,
          info: true,
          biografie: true,
          foto: true,
          logo: true,
          date_start: true,
          date_end: true,
        },
      }),

      prisma.system_countries.findMany({
        select: {
          id_c: true,
          text: true,
        },
        orderBy: {
          text: "asc",
        },
      }),

      prisma.system_styles.findMany({
        select: {
          id_s: true,
          text: true,
        },
        orderBy: {
          text: "asc",
        },
      }),
    ]);

  if (!band) {
    notFound();
  }

  return (
    <main className="min-h-screen bg-zinc-950 px-6 py-8 text-white">
      <div className="mx-auto max-w-4xl">

        <div className="mb-8 flex items-center justify-between">

          <div>
            <h1 className="text-4xl font-bold text-red-500">
              Edit Band
            </h1>

            <p className="mt-2 text-zinc-400">
              Edit {band.name}
            </p>
          </div>

          <a
            href="/admin/bands"
            className="text-sm text-zinc-400 hover:text-red-500"
          >
            ← Bands
          </a>

        </div>

        <EditBandForm
          band={{
            id_i: band.id_i,
            name: band.name,
            city: band.city,
            country: band.country,
            styles: band.styles,
            homepage: band.homepage,
            info: band.info,
            biografie: band.biografie,
            foto: band.foto,
            logo: band.logo,
            date_start: formatDateForInput(
              band.date_start
            ),
            date_end: formatDateForInput(
              band.date_end
            ),
          }}
          countries={countries}
          genres={genres}
        />

      </div>
    </main>
  );
}