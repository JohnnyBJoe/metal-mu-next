import { prisma } from "@/lib/prisma";
import EditMusicianForm from "./EditMusicianForm";

type Props = {
  params: Promise<{
    id: string;
  }>;
};

export default async function EditMusicianPage({
  params,
}: Props) {
  const { id } = await params;

  const musicianId = Number(id);

  if (!Number.isInteger(musicianId)) {
    return (
      <main className="min-h-screen bg-zinc-950 px-6 py-8 text-white">
        <div className="mx-auto max-w-4xl">
          <div className="rounded border border-red-900 bg-red-950/30 p-6 text-red-400">
            Invalid musician ID.
          </div>
        </div>
      </main>
    );
  }

  const [musician, bands] = await Promise.all([
    prisma.system_interprets_members.findUnique({
      where: {
        id_m: musicianId,
      },
      select: {
        id_m: true,
        name: true,
        real_name: true,
        instrument: true,
        date_of_birth: true,
        text: true,
        interpret: true,
        place_of_birth: true,
        pusobeni: true,
        date_of_dead: true,
        stav: true,
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
  ]);

  if (!musician) {
    return (
      <main className="min-h-screen bg-zinc-950 px-6 py-8 text-white">
        <div className="mx-auto max-w-4xl">
          <div className="rounded border border-red-900 bg-red-950/30 p-6 text-red-400">
            Musician not found.
          </div>

          <a
            href="/admin/musicians"
            className="mt-4 inline-block text-sm text-zinc-400 hover:text-red-500"
          >
            ← Musicians
          </a>
        </div>
      </main>
    );
  }

  return (
    <EditMusicianForm
      musician={musician}
      bands={bands}
    />
  );
}