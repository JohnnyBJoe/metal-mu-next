import { prisma } from "@/lib/prisma";
import NewMusicianForm from "./NewMusicianForm";

export default async function NewMusicianPage() {
  const bands = await prisma.system_interprets.findMany({
    select: {
      id_i: true,
      name: true,
    },
    orderBy: {
      name: "asc",
    },
  });

  return (
    <NewMusicianForm
      bands={bands}
    />
  );
}