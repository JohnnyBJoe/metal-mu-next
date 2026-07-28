import { PrismaClient } from "@prisma/client";
import { parseAlbumInfo } from "./lib/album-parser";

const prisma = new PrismaClient();

async function main() {

  const albumId = 55; // změň podle potřeby

  const album =
    await prisma.system_discography.findUnique({
      where: {
        id_d: albumId,
      },
      select: {
        id_d: true,
        name: true,
        info: true,
      },
    });

  if (!album) {
    console.log("Album not found.");
    return;
  }

  console.log("");
  console.log("========================================");
  console.log(`${album.id_d} - ${album.name}`);
  console.log("========================================");
  console.log("");

  const credits =
    parseAlbumInfo(album.info ?? "");

  for (const credit of credits) {

    console.log(
      `[${credit.section}] ${credit.creditedAs} -> ${credit.role}`
    );
  }

  console.log("");
  console.log("----------------------------------------");
  console.log(`Credits: ${credits.length}`);
}

main()
  .catch(console.error)
  .finally(async () => {
    await prisma.$disconnect();
  });