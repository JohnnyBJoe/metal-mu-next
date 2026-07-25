import { prisma } from "@/lib/prisma";

import type { Person } from "@/types/person";

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
  letter: string
) {
  return prisma.system_interprets_members.findMany({
    where: {
      name: {
        startsWith: letter,
      },
    },
    orderBy: {
      name: "asc",
    },
    select: {
      id_m: true,
      name: true,
      instrument: true,
      interpret: true,
    },
  });
}