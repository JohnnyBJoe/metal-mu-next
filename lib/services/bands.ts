import { prisma } from "@/lib/prisma";
import { PAGE_SIZE } from "@/lib/constants";

export async function getBands(
  letter: string,
  page: number = 1
) {
  const where = {
    name: {
      startsWith: letter,
    },
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
        city: true,
        styles: true,
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

export async function getBand(id: number) {
  return prisma.system_interprets.findUnique({
    where: {
      id_i: id,
    },
    select: {
      id_i: true,
      name: true,

      city: true,
      country: true,

      styles: true,

      homepage: true,

      biografie: true,

      foto: true,
      logo: true,

      date_start: true,
      date_end: true,
    },
  });
}

export async function getBandLetter(
  bandId: number
): Promise<string> {
  const band = await prisma.system_interprets.findUnique({
    where: {
      id_i: bandId,
    },
    select: {
      name: true,
    },
  });

  if (!band) {
    return "A";
  }

  return band.name.charAt(0).toUpperCase();
}

/**
 * Vrátí číslo stránky, na které se kapela nachází
 * v abecedním seznamu.
 */
export async function getBandPage(
  bandId: number
): Promise<number> {
  const band = await prisma.system_interprets.findUnique({
    where: {
      id_i: bandId,
    },
    select: {
      name: true,
    },
  });

  if (!band) {
    return 1;
  }

  const letter = band.name.charAt(0).toUpperCase();

  const bands = await prisma.system_interprets.findMany({
    where: {
      name: {
        startsWith: letter,
      },
    },
    orderBy: {
      name: "asc",
    },
    select: {
      id_i: true,
    },
  });

  const index = bands.findIndex((b) => b.id_i === bandId);

  if (index < 0) {
    return 1;
  }

  return Math.floor(index / PAGE_SIZE) + 1;
}