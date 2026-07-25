import { prisma } from "@/lib/prisma";

export async function getBands(letter: string) {
  return prisma.system_interprets.findMany({
    where: {
      name: {
        startsWith: letter,
      },
    },
    orderBy: {
      name: "asc",
    },
    take: 100,
    select: {
      id_i: true,
      name: true,
      city: true,
      styles: true,
    },
  });
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