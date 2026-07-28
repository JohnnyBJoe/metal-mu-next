import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

async function main() {

  const albums = await prisma.system_discography.findMany({
  where: {
    id_d: {
      lte: 1095,
    },
  },
  orderBy: {
    id_d: "asc",
  },
  select: {
    id_d: true,
    name: true,
    info: true,
  },
});

  let inserted = 0;
  let skipped = 0;
  let notFound = 0;
const missingPersons = new Map<string, number>();
  for (const album of albums) {

    if (!album.info) {
      continue;
    }

    console.log("");
    console.log("=================================================");
    console.log(`${album.id_d} - ${album.name}`);

    const lines = album.info
      .replace(/<br\s*\/?>/gi, "\n")
      .split("\n")
      .map((line) => line.trim());

    let position = 1;
let section = "Line-up";
let blankLine = false;
let foundLineup = false;

    for (const line of lines) {
if (line === "") {
  blankLine = true;
  continue;
}

if (blankLine) {

  if (
    line.startsWith("Produced by") ||
    line.startsWith("Recorded at") ||
    line.startsWith("Engineered by") ||
    line.startsWith("Mixed by")
  ) {
    break;
  }

  if (
  foundLineup &&
  /<b>.*?<\/b>\s*-\s*/i.test(line)
) {
  section = "Guest";
}

  blankLine = false;
}
      if (
        line.startsWith("Produced by") ||
        line.startsWith("Recorded at") ||
        line.startsWith("Engineered by") ||
        line.startsWith("Mixed by")
      ) {
        break;
      }

      const match = line.match(
        /<b>(.*?)<\/b>\s*-\s*(.*)/i
      );

      if (!match) {
        continue;
      }

      const creditedAs = match[1].trim();
      const role = match[2].trim();

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

      if (!member) {
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
      }

      if (!member) {

        const parts = creditedAs.split(" ");

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
        }
      }

      if (!member) {

  notFound++;

  const count = missingPersons.get(creditedAs) ?? 0;
  missingPersons.set(creditedAs, count + 1);

  continue;
}

      const exists =
        await prisma.system_album_members.findFirst({
          where: {
            album: album.id_d,
            member: member.id_m,
          },
        });

      if (exists) {

        skipped++;

        continue;
      }

      await prisma.system_album_members.create({
        data: {
          album: album.id_d,
          member: member.id_m,
          section,
          role,
          credited_as: creditedAs,
          position,
        },
      });

      inserted++;
position++;
foundLineup = true;

console.log(`OK : ${creditedAs}`);
    }
  }

  console.log("");
  console.log("=========================================");
  console.log(`Inserted : ${inserted}`);
  console.log(`Skipped  : ${skipped}`);
  console.log(`Not found: ${notFound}`);
  console.log("");
console.log("=========================================");
console.log("Missing persons");
console.log("=========================================");

const sorted = [...missingPersons.entries()]
  .sort((a, b) => b[1] - a[1]);

for (const [name, count] of sorted) {
  console.log(`${count.toString().padStart(3)}x  ${name}`);
}
}

main()
  .catch(console.error)
  .finally(async () => {
    await prisma.$disconnect();
  });