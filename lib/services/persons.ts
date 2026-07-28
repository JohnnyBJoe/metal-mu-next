import { prisma } from "@/lib/prisma";

import type { Person } from "@/types/person";

import { PAGE_SIZE } from "@/lib/constants";

export async function getPerson(
  id: number
): Promise<(Person & { bandName: string | null }) | null> {

  const person = await prisma.system_interprets_members.findUnique({
    where: {
      id_m: id,
    },
    select: {
      id_m: true,
      name: true,
      instrument: true,
      date_of_birth: true,
      date_of_dead: true,
      place_of_birth: true,
      text: true,
      interpret: true,
      pusobeni: true,
      stav: true,
    },
  });

  if (!person) {
    return null;
  }

  const band = await prisma.system_interprets.findUnique({
    where: {
      id_i: person.interpret,
    },
    select: {
      name: true,
    },
  });

  return {
    ...person,
    bandName: band?.name ?? null,
  };
}

export async function getPersonsByLetter(
  letter: string,
  page = 1
) {

  const where = {
    name: {
      startsWith: letter,
    },
  };

  const [items, total] = await Promise.all([

    prisma.system_interprets_members.findMany({
      where,

      orderBy: {
        name: "asc",
      },

      skip: (page - 1) * PAGE_SIZE,
      take: PAGE_SIZE,

      select: {
        id_m: true,
        name: true,
        instrument: true,
        interpret: true,
      },
    }),

    prisma.system_interprets_members.count({
      where,
    }),

  ]);

  return {
    items,
    total,
  };
}

export async function getPersonAlbums(
  personId: number
) {

  const members = await prisma.system_album_members.findMany({
    where: {
      member: personId,
    },

    orderBy: {
      position: "asc",
    },

    select: {
      album: true,
      position: true,
    },
  });

  if (members.length === 0) {
    return [];
  }

  const albums = await prisma.system_discography.findMany({
    where: {
      id_d: {
        in: members.map((m) => m.album),
      },
    },

    select: {
  id_d: true,
  name: true,
  vydano: true,
  interpret: true,
  type: true,
},
  });

  return members
    .map((member) => ({
      position: member.position,
      system_discography: albums.find(
        (album) => album.id_d === member.album
      ),
    }))
    .filter((item) => item.system_discography)
    .sort((a, b) => {
      const dateA =
        a.system_discography?.vydano ?? "";

      const dateB =
        b.system_discography?.vydano ?? "";

      return dateB.localeCompare(dateA);
    });
}