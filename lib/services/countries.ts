import { prisma } from "@/lib/prisma";

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

export async function getCountryBands(id: number) {
  return prisma.system_interprets.findMany({
    where: {
      country: id,
    },
    orderBy: {
      name: "asc",
    },
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
  });
}

export async function getCountryData(
  countryId: number,
  bandId?: number
) {
  const country = await getCountry(countryId);

  const bands = await getCountryBands(countryId);

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