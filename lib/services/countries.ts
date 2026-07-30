import { prisma } from "@/lib/prisma";
import { PAGE_SIZE } from "@/lib/constants";

export async function getCountries() {
  return prisma.system_countries.findMany({
    orderBy: {
      text: "asc",
    },
  });
}

export async function getCountry(id: number) {
  return prisma.system_countries.findUnique({
    where: {
      id_c: id,
    },
  });
}

export async function getCountryBands(
  id: number,
  page: number = 1
) {
  const where = {
    country: id,
  };

  const [items, total] = await Promise.all([
    prisma.system_interprets.findMany({
      where,
      orderBy: {
        name: "asc",
      },
      skip: (page - 1) * PAGE_SIZE,
      take: PAGE_SIZE,
      select: {
        id_i: true,
        name: true,
        logo: true,
        styles: true,
        country: true,
        city: true,
        date_start: true,
        date_end: true,
      },
    }),

    prisma.system_interprets.count({
      where,
    }),
  ]);

  return {
    items,
    total,
  };
}

/**
 * Vrátí číslo stránky, na které se kapela nachází
 * v seznamu kapel dané země.
 */
export async function getCountryBandPage(
  countryId: number,
  bandId: number
): Promise<number> {
  const bands = await prisma.system_interprets.findMany({
    where: {
      country: countryId,
    },
    orderBy: {
      name: "asc",
    },
    select: {
      id_i: true,
    },
  });

  const index = bands.findIndex(
    (b) => b.id_i === bandId
  );

  if (index < 0) {
    return 1;
  }

  return Math.floor(index / PAGE_SIZE) + 1;
}

export async function getCountryData(
  countryId: number,
  bandId?: number
) {
  const country = await getCountry(countryId);

  const { items: bands } =
    await getCountryBands(countryId);

  const selectedBand = bandId
    ? await prisma.system_interprets.findUnique({
        where: {
          id_i: bandId,
        },
      })
    : null;

  return {
    country,
    bands,
    selectedBand,
  };
}