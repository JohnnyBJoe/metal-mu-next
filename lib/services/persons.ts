import { prisma } from "@/lib/prisma";

import type { Person } from "@/types/person";

import { PAGE_SIZE } from "@/lib/constants";

function getPersonGroup(name: string): string {
  const first = name.charAt(0).toUpperCase();

  if (/^\d$/.test(first)) {
    return "0-9";
  }

  return first;
}

function getPersonWhere(letter: string) {
  if (letter === "0-9") {
    return {
      OR: Array.from({ length: 10 }, (_, i) => ({
        name: {
          startsWith: String(i),
        },
      })),
    };
  }

  return {
    name: {
      startsWith: letter,
    },
  };
}

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
  const where = getPersonWhere(letter);

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

export async function getPersonLetter(
  personId: number
): Promise<string> {
  const person = await prisma.system_interprets_members.findUnique({
    where: {
      id_m: personId,
    },
    select: {
      name: true,
    },
  });

  if (!person) {
    return "A";
  }

  return getPersonGroup(person.name);
}

export async function getPersonPage(
  personId: number
): Promise<number> {
  const person = await prisma.system_interprets_members.findUnique({
    where: {
      id_m: personId,
    },
    select: {
      name: true,
    },
  });

  if (!person) {
    return 1;
  }

  const letter = getPersonGroup(person.name);

  const persons = await prisma.system_interprets_members.findMany({
    where: getPersonWhere(letter),
    orderBy: {
      name: "asc",
    },
    select: {
      id_m: true,
    },
  });

  const index = persons.findIndex(
    (p) => p.id_m === personId
  );

  if (index === -1) {
    return 1;
  }

  return Math.floor(index / PAGE_SIZE) + 1;
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