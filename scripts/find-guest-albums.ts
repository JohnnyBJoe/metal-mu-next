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

    const html = album.info ?? "";

    const normalized = html
      .replace(/\r/g, "")
      .replace(/<br\s*\/?>/gi, "\n");

    const lines = normalized
      .split("\n")
      .map((l) => l.trim());

    let musicians = 0;
    let blankAfterMusicians = false;
    let possibleGuests = false;

    for (const line of lines) {

      if (/^Produced by/i.test(line)) {
        break;
      }

      if (/<b>.*?<\/b>\s*-/i.test(line)) {

        musicians++;

        if (blankAfterMusicians) {
          possibleGuests = true;
        }

        blankAfterMusicians = false;
        continue;
      }

      if (line === "") {
        blankAfterMusicians = true;
      }
    }

    if (possibleGuests) {

      console.log("");
      console.log(
        `${album.id_d} - ${album.name}`
      );

      console.log("------------------------");

      console.log(
        lines
          .filter((l) => l !== "")
          .slice(0, 20)
          .join("\n")
      );
    }
  }
}

main()
  .catch(console.error)
  .finally(async () => {
    await prisma.$disconnect();
  });