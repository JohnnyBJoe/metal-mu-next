import { prisma } from "@/lib/prisma";
import NewAlbumForm from "./NewAlbumForm";

export default async function NewAlbumPage() {
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
    <NewAlbumForm
      bands={bands}
    />
  );
}