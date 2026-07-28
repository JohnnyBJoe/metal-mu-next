import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

async function main() {

  const albums = await prisma.system_discography.findMany({
    orderBy: {
      id_d: "asc",
    },
    select: {
      id_d: true,
      name: true,
      info: true,
    },
  });

  for (const album of albums) {

    if (!album.info) {
      continue;
    }

    console.log("");
    console.log("=================================================");
    console.log(`${album.id_d} - ${album.name}`);
    console.log("=================================================");

    const lines = album.info
      .replace(/\r/g, "")
      .replace(/<br\s*\/?>/gi, "\n")
      .split("\n")
      .map((line) => line.trim());

    let block = 1;
    let empty = false;
    let printed = false;

    console.log(`\n--- BLOCK ${block} ---`);

    for (const line of lines) {

      if (
        /^Produced by/i.test(line) ||
        /^Recorded at/i.test(line) ||
        /^Engineered by/i.test(line) ||
        /^Mixed by/i.test(line)
      ) {
        break;
      }

      if (line === "") {

        if (!empty) {
          empty = true;
        }

        continue;
      }

      if (empty) {

        if (/<b>.*?<\/b>\s*-/i.test(line)) {

          block++;

          console.log(`\n--- BLOCK ${block} ---`);
        }

        empty = false;
      }

      const match = line.match(
        /<b>(.*?)<\/b>\s*-\s*(.*)/i
      );

      if (!match) {
        continue;
      }

      printed = true;

      console.log(
        `${match[1]} -> ${match[2]}`
      );
    }

    if (!printed) {
      console.log("(no credits)");
    }
  }
}

main()
  .catch(console.error)
  .finally(async () => {
    await prisma.$disconnect();
  });