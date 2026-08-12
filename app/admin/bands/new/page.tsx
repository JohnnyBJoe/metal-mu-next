import { prisma } from "@/lib/prisma";
import NewBandForm from "./NewBandForm";

export default async function NewBandPage() {
  const [countries, genres] = await Promise.all([
    prisma.system_countries.findMany({
      select: {
        id_c: true,
        text: true,
      },
      orderBy: {
        text: "asc",
      },
    }),

    prisma.system_styles.findMany({
      select: {
        id_s: true,
        text: true,
      },
      orderBy: {
        text: "asc",
      },
    }),
  ]);

  return (
    <NewBandForm
      countries={countries}
      genres={genres}
    />
  );
}