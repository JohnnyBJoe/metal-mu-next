import { prisma } from "@/lib/prisma";
import EditAlbumForm from "./EditAlbumForm";

type Props = {
  params: Promise<{
    id: string;
  }>;
};

export default async function EditAlbumPage({
  params,
}: Props) {
  const { id } = await params;

  const albumId = Number(id);

  if (!Number.isInteger(albumId)) {
    return (
      <main className="min-h-screen bg-zinc-950 px-6 py-8 text-white">
        <div className="mx-auto max-w-4xl">
          <div className="rounded border border-red-900 bg-red-950/30 p-6 text-red-400">
            Invalid album ID.
          </div>
        </div>
      </main>
    );
  }

  const [album, bands, tracks] = await Promise.all([
    prisma.system_discography.findUnique({
      where: {
        id_d: albumId,
      },
      select: {
        id_d: true,
        interpret: true,
        name: true,
        type: true,
        info: true,
        vydano: true,
        obal: true,
        label: true,
      },
    }),

    prisma.system_interprets.findMany({
      select: {
        id_i: true,
        name: true,
      },
      orderBy: {
        name: "asc",
      },
    }),

    prisma.system_discography_tracks.findMany({
      where: {
        album: albumId,
      },
      select: {
        id_t: true,
        name: true,
        lyric: true,
      },
      orderBy: {
        id_t: "asc",
      },
    }),
  ]);

  if (!album) {
    return (
      <main className="min-h-screen bg-zinc-950 px-6 py-8 text-white">
        <div className="mx-auto max-w-4xl">
          <div className="rounded border border-red-900 bg-red-950/30 p-6 text-red-400">
            Album not found.
          </div>

          <a
            href="/admin/albums"
            className="mt-4 inline-block text-sm text-zinc-400 hover:text-red-500"
          >
            ← Albums
          </a>
        </div>
      </main>
    );
  }

  return (
    <EditAlbumForm
      album={album}
      bands={bands}
      tracks={tracks}
    />
  );
}