import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export async function findMember(
  creditedAs: string
) {

  let member =
    await prisma.system_interprets_members.findFirst({
      where: {
        name: creditedAs,
      },
      select: {
        id_m: true,
        name: true,
        real_name: true,
      },
    });

  if (member) {
    return member;
  }

  member =
    await prisma.system_interprets_members.findFirst({
      where: {
        real_name: creditedAs,
      },
      select: {
        id_m: true,
        name: true,
        real_name: true,
      },
    });

  if (member) {
    return member;
  }

  const parts = creditedAs.split(/\s+/);

  if (parts.length === 2) {

    const [firstName, lastName] = parts;

    const candidates =
      await prisma.system_interprets_members.findMany({
        where: {
          OR: [
            {
              name: {
                startsWith: `${firstName} `,
              },
            },
            {
              real_name: {
                startsWith: `${firstName} `,
              },
            },
          ],
        },
        select: {
          id_m: true,
          name: true,
          real_name: true,
        },
      });

    member =
      candidates.find(
        (candidate) =>
          candidate.name.endsWith(lastName) ||
          candidate.real_name.endsWith(lastName)
      ) ?? null;

    if (member) {
      return member;
    }
  }

  return null;
}