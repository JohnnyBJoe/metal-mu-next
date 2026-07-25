import { prisma } from "@/lib/prisma";

export async function getTracks(albumId: number) {
  return prisma.system_discography_tracks.findMany({
    where: {
      album: albumId,
    },
    orderBy: {
      id_t: "asc",
    },
    select: {
      id_t: true,
      album: true,
      interpret: true,

      name: true,

      lyric: true,
      mp3: true,
    },
  });
}

export async function getTrack(id: number) {
  return prisma.system_discography_tracks.findUnique({
    where: {
      id_t: id,
    },
    select: {
      id_t: true,
      album: true,
      interpret: true,

      name: true,

      lyric: true,
      mp3: true,
    },
  });
}