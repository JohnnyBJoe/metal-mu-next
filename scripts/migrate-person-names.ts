import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

function suggestName(fullName: string): string | null {
  const match = fullName.match(/"(.*?)"/);

  if (!match) {
    return null;
  }

  const nickname = match[1].trim();

  // přezdívka už obsahuje celé jméno
  if (nickname.includes(" ")) {
    return nickname;
  }

  const clean = fullName.replace(/".*?"/, "").trim();
  const parts = clean.split(/\s+/);

  // pokud za přezdívkou není příjmení
  if (parts.length < 2) {
    return nickname;
  }

  const surname = parts[parts.length - 1];

  return `${nickname} ${surname}`;
}

async function main() {
  const persons = await prisma.system_interprets_members.findMany({
    orderBy: {
      id_m: "asc",
    },
    select: {
      id_m: true,
      name: true,
      real_name: true,
    },
  });

  let updated = 0;

  for (const person of persons) {
    const suggestion = suggestName(person.name);

    if (!suggestion) {
      continue;
    }

    console.log("------------------------------------------");
    console.log(`Updating: ${person.name}`);
    console.log(`      -> ${suggestion}`);

    await prisma.system_interprets_members.update({
      where: {
        id_m: person.id_m,
      },
      data: {
        real_name: person.name,
        name: suggestion,
      },
    });

    updated++;
  }

  console.log("");
  console.log(`Updated persons: ${updated}`);
}

main()
  .catch(console.error)
  .finally(async () => {
    await prisma.$disconnect();
  });