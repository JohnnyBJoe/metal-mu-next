import { prisma } from "@/lib/prisma";

import type { Person } from "@/types/person";

export async function getPerson(
  id: number
): Promise<Person | null> {

  return prisma.system_interprets_members.findUnique({
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
}