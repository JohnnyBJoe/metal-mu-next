import { prisma } from "@/lib/prisma";

export async function getDiscography(bandId: number) {
  return prisma.system_discography.findMany({
    where: {
      interpret: bandId,
    },
    orderBy: {
      vydano: "asc",
    },
    select: {
      id_d: true,
      name: true,
      vydano: true,
      type: true,
    },
  });
}

export async function getAlbum(id: number) {
  return prisma.system_discography.findUnique({
    where: {
      id_d: id,
    },
  });
}