import { prisma } from "@/lib/prisma";

export async function getDiscography(
  bandId: number
) {
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

export async function getAlbum(
  id: number
) {
  return prisma.system_discography.findUnique({
    where: {
      id_d: id,
    },
    select: {
      id_d: true,
      interpret: true,
      name: true,
      type: true,
      vydano: true,
      info: true,
      obal: true,
      label: true,
    },
  });
}

export async function getAlbumLineup(
  albumId: number
) {
  const lineup = await prisma.system_album_members.findMany({
    where: {
      album: albumId,
      section: "Line-up",
    },
    orderBy: {
      position: "asc",
    },
    select: {
      member: true,
      role: true,
      credited_as: true,
      position: true,
    },
  });

  if (lineup.length === 0) {
    return [];
  }

  const persons = await prisma.system_interprets_members.findMany({
    where: {
      id_m: {
        in: lineup
          .map((item) => item.member)
          .filter((id): id is number => id !== null),
      },
    },
    select: {
      id_m: true,
      name: true,
    },
  });

  return lineup.map((item) => ({
    ...item,
    person:
      persons.find(
        (person) => person.id_m === item.member
      ) ?? null,
  }));
}

export async function getAlbumGuests(
  albumId: number
) {
  const guests = await prisma.system_album_members.findMany({
    where: {
      album: albumId,
      section: "Guest",
    },
    orderBy: {
      position: "asc",
    },
    select: {
      member: true,
      role: true,
      credited_as: true,
      position: true,
    },
  });

  if (guests.length === 0) {
    return [];
  }

  const persons = await prisma.system_interprets_members.findMany({
    where: {
      id_m: {
        in: guests
          .map((item) => item.member)
          .filter((id): id is number => id !== null),
      },
    },
    select: {
      id_m: true,
      name: true,
    },
  });

  return guests.map((item) => ({
    ...item,
    person:
      persons.find(
        (person) => person.id_m === item.member
      ) ?? null,
  }));
}
export async function getLatestAlbumCovers(
  limit: number = 6
) {

  const albums = await prisma.system_discography.findMany({
    where: {
      obal: {
        not: "",
      },
    },

    orderBy: {
      date: "desc",
    },

    take: limit,

    select: {
      id_d: true,
      interpret: true,
      name: true,
      vydano: true,
      obal: true,
    },
  });

  const bandIds = albums.map((album) => album.interpret);

  const bands = await prisma.system_interprets.findMany({
    where: {
      id_i: {
        in: bandIds,
      },
    },

    select: {
      id_i: true,
      name: true,
    },
  });

  const bandMap = new Map(
    bands.map((band) => [
      band.id_i,
      band.name,
    ])
  );

  return albums.map((album) => ({
    ...album,
    band: bandMap.get(album.interpret) ?? "",
  }));
}