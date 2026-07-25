import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

function suggestName(fullName: string): string | null {

  const match = fullName.match(/"(.*?)"/);

  if (!match) {
    return null;
  }

  const nickname = match[1].trim();

  // přezdívka obsahuje celé umělecké jméno
  if (nickname.includes(" ")) {
    return nickname;
  }

  // vezmeme poslední slovo jako příjmení
  const clean = fullName.replace(/".*?"/, "").trim();

  const parts = clean.split(/\s+/);

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
    },
  });

  let count = 0;

  for (const person of persons) {

    const suggestion = suggestName(person.name);

    if (!suggestion) {
      continue;
    }

    count++;

    console.log("------------------------------------------");
    console.log(`ID        : ${person.id_m}`);
    console.log(`Current   : ${person.name}`);
    console.log(`Suggested : ${suggestion}`);
  }

  console.log("");
  console.log(`Suggestions: ${count}`);
}

main()
  .catch(console.error)
  .finally(async () => {
    await prisma.$disconnect();
  });