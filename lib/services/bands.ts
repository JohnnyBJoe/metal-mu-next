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
    },
  });
}