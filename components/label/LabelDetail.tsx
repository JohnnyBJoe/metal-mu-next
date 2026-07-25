import Link from "next/link";

import type { LabelAlbum } from "@/types/label";

type LabelDetailProps = {
  label: string;
  albums: LabelAlbum[];
};

export default function LabelDetail({
  label,
  albums,
}: LabelDetailProps) {
  return (
    <main className="rounded bg-zinc-900 p-6">

      <h1 className="mb-6 text-4xl font-bold text-red-500">
        {label}
      </h1>

      <h2 className="mb-4 text-2xl font-semibold text-zinc-300">
        Albums
      </h2>

      <ul className="space-y-2">

        {albums.map((album) => (

          <li
            key={album.id_d}
            className="rounded border border-zinc-800 bg-zinc-950 px-4 py-2 hover:border-red-500"
          >

            <Link
              href={`/?band=${album.interpret}&album=${album.id_d}`}
              className="block text-zinc-300 hover:text-red-500"
            >
              <strong>{album.vydano}</strong>{" "}
              {album.name}
            </Link>

          </li>

        ))}

      </ul>

    </main>
  );
}