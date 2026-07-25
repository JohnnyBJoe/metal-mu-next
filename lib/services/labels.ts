import { prisma } from "@/lib/prisma";

import { normalizeLabel } from "@/lib/helpers/labels";
import type { LabelAlbum } from "@/types/label";

export async function getAlbumsByLabel(
  label: string
): Promise<LabelAlbum[]> {

  const normalized = normalizeLabel(label);

  const albums = await prisma.system_discography.findMany({
    select: {
      id_d: true,
      interpret: true,

      name: true,
      vydano: true,

      label: true,
    },
    orderBy: {
      vydano: "asc",
    },
  });

  return albums.filter(
    (album) =>
      normalizeLabel(album.label ?? "") === normalized
  );
}