import { PrismaClient } from "@prisma/client";
import readline from "node:readline/promises";
import { stdin as input, stdout as output } from "node:process";

const prisma = new PrismaClient();

const rl = readline.createInterface({
  input,
  output,
});

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

  let current = 0;

  for (const album of albums) {

    current++;

    if (!album.info) {
      continue;
    }

    const exists =
      await prisma.system_album_guest_start.findUnique({
        where: {
          album: album.id_d,
        },
      });

    if (exists) {
      continue;
    }

    const matches = [
  ...album.info.matchAll(
    /<b>(.*?)<\/b>\s*-/gi
  ),
];

if (matches.length === 0) {
  continue;
}

// Pravděpodobný přechod na hosty:
// dvě a více prázdných řádků následovaných dalším muzikantem
const guestSeparator =
  /<br\s*\/?>\s*(<br\s*\/?>\s*){2,}<b>/i;

if (!guestSeparator.test(album.info)) {
  continue;
}

    console.clear();

    console.log(
      "=================================================="
    );
    console.log(
      `[${current}/${albums.length}] ${album.id_d} - ${album.name}`
    );
    console.log(
      "==================================================\n"
    );

    matches.forEach((match, index) => {
      console.log(
        `${(index + 1)
          .toString()
          .padStart(2)}. ${match[1].trim()}`
      );
    });

    console.log("\n------------------------------------------");
    console.log("0 = žádní hosté");
    console.log("s = přeskočit");
    console.log("q = konec");
    console.log("------------------------------------------");

    const answer = (
      await rl.question("\nPrvní host: ")
    )
      .trim()
      .toLowerCase();

    if (answer === "q") {
      break;
    }

    if (answer === "s" || answer === "0") {
      continue;
    }

    const index = Number(answer);

    if (
      Number.isNaN(index) ||
      index < 1 ||
      index > matches.length
    ) {
      console.log("\nNeplatná volba.");
      await rl.question("Enter...");
      current--;
      continue;
    }

    const firstGuest =
      matches[index - 1][1].trim();

    await prisma.system_album_guest_start.create({
      data: {
        album: album.id_d,
        first_guest: firstGuest,
      },
    });

    console.log(
      `\n✔ Uloženo: ${firstGuest}`
    );

    await rl.question("\nEnter...");
  }

  rl.close();
}

main()
  .catch(console.error)
  .finally(async () => {
    await prisma.$disconnect();
  });