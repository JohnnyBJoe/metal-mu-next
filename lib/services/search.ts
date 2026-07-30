import { prisma } from "@/lib/prisma";
import { SEARCH_LIMIT } from "@/lib/constants";

export async function searchAll(text: string) {
  const query = text.trim();

  if (query.length < 2) {
    return {
      bands: [],
      persons: [],
      albums: [],
    };
  }

  const [bands, persons, albums] = await Promise.all([
    prisma.system_interprets.findMany({
      where: {
        name: {
          contains: query,
        },
      },
      orderBy: {
        name: "asc",
      },
      take: SEARCH_LIMIT,
      select: {
        id_i: true,
        name: true,
      },
    }),

    prisma.system_interprets_members.findMany({
      where: {
        name: {
          contains: query,
        },
      },
      orderBy: {
        name: "asc",
      },
      take: SEARCH_LIMIT,
      select: {
        id_m: true,
        name: true,
        interpret: true,
      },
    }),

    prisma.system_discography.findMany({
      where: {
        name: {
          contains: query,
        },
      },
      orderBy: {
        name: "asc",
      },
      take: SEARCH_LIMIT,
      select: {
        id_d: true,
        name: true,
        interpret: true,
        vydano: true,
      },
    }),
  ]);

  const interpretIds = Array.from(
    new Set([
      ...persons.map((p) => p.interpret),
      ...albums.map((a) => a.interpret),
    ])
  );

  const interprets = interpretIds.length
    ? await prisma.system_interprets.findMany({
        where: {
          id_i: {
            in: interpretIds,
          },
        },
        select: {
          id_i: true,
          name: true,
        },
      })
    : [];

  const interpretMap = new Map(
    interprets.map((i) => [i.id_i, i.name])
  );

  return {
    bands,

    persons: persons.map((person) => ({
      id_m: person.id_m,
      name: person.name,
      bandId: person.interpret,
      bandName: interpretMap.get(person.interpret) ?? null,
    })),

    albums: albums.map((album) => ({
      id_d: album.id_d,
      name: album.name,
      bandId: album.interpret,
      bandName: interpretMap.get(album.interpret) ?? null,
      vydano: album.vydano,
    })),
  };
}