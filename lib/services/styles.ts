import { prisma } from "@/lib/prisma";

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

export async function getGenreBands(id: number) {
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

  return bands.filter((band) =>
    band.styles
      .split(",")
      .map(Number)
      .includes(id)
  );
}