import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

async function main() {
  const album = await prisma.system_discography.findUnique({
    where: {
      id_d: 11,
    },
    select: {
      id_d: true,
      name: true,
      info: true,
    },
  });

  if (!album || !album.info) {
    console.log("Album not found.");
    return;
  }

  console.log(`Album: ${album.name}`);
  console.log("");

  const lines = album.info
    .replace(/<br\s*\/?>/gi, "\n")
    .split("\n")
    .map((line) => line.trim())
    .filter((line) => line.length);

  for (const line of lines) {

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

    const members = await prisma.system_interprets_members.findMany({
  where: {
    name: {
      contains: creditedAs.split(" ")[0],
    },
  },
  select: {
    id_m: true,
    name: true,
  },
});

console.log("Possible matches:", members);

    console.log("--------------------------------");
    console.log("Name :", creditedAs);
    console.log("Role :", role);

    if (member) {
      console.log("Found: YES");
      console.log("ID   :", member.id_m);
    } else {
      console.log("Found: NO");
    }
  }
}

main()
  .catch(console.error)
  .finally(async () => {
    await prisma.$disconnect();
  });