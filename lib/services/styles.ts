import { prisma } from "@/lib/prisma";
import { PAGE_SIZE } from "@/lib/constants";

export async function getGenres() {
  return prisma.system_styles.findMany({
    orderBy: {
      text: "asc",
    },
  });
}

export async function getGenre(id: number) {
  return prisma.system_styles.findUnique({
    where: {
      id_s: id,
    },
  });
}

export async function getGenreBands(
  id: number,
  page: number = 1
) {
  const bands = await prisma.system_interprets.findMany({
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

  const filtered = bands.filter((band) =>
    band.styles
      .split(",")
      .map(Number)
      .includes(id)
  );

  return {
    items: filtered.slice(
      (page - 1) * PAGE_SIZE,
      page * PAGE_SIZE
    ),
    total: filtered.length,
  };
}

/**
 * Vrátí číslo stránky kapely v seznamu žánru.
 */
export async function getGenreBandPage(
  genreId: number,
  bandId: number
): Promise<number> {
  const bands = await prisma.system_interprets.findMany({
    orderBy: {
      name: "asc",
    },
    select: {
      id_i: true,
      styles: true,
    },
  });

  const filtered = bands.filter((band) =>
    band.styles
      .split(",")
      .map(Number)
      .includes(genreId)
  );

  const index = filtered.findIndex(
    (b) => b.id_i === bandId
  );

  if (index < 0) {
    return 1;
  }

  return Math.floor(index / PAGE_SIZE) + 1;
}