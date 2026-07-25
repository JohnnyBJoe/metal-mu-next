import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

async function main() {
  const albums = await prisma.system_discography.findMany({
    take: 5,
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
    console.log("========================================");
    console.log(`${album.id_d} - ${album.name}`);
    console.log("----------------------------------------");

    console.log(album.info);

    console.log("");
  }
}

main()
  .catch(console.error)
  .finally(async () => {
    await prisma.$disconnect();
  });
  