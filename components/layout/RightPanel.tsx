import Link from "next/link";

type Album = {
  id_d: number;
  name: string;
  vydano: string | null;
  type: number;
};

type RightPanelProps = {
  albums: Album[];
};

const TYPES: Record<number, string> = {
  1: "Studio",
  2: "Live",
  3: "Compilation",
  4: "EP",
  5: "Single",
  6: "Demo",
  7: "Video",
  8: "Bootleg",
};

export default function RightPanel({
  albums,
}: RightPanelProps) {
  return (
    <aside className="rounded bg-zinc-900 p-4 h-[calc(100vh-110px)] overflow-y-auto">

      <h2 className="mb-4 text-lg font-semibold text-red-500">
        Discography
      </h2>

      {Object.entries(TYPES).map(([type, title]) => {

        const list = albums.filter(
          (album) => album.type === Number(type)
        );

        if (!list.length) return null;

        return (
          <div key={type} className="mb-6">

            <h3 className="mb-2 font-semibold text-zinc-300">
              {title}
            </h3>

            <ul className="space-y-1">

              {list.map((album) => (
                <li key={album.id_d}>

                  <Link
                    href={`/?album=${album.id_d}`}
                    className="text-sm text-zinc-400 hover:text-red-500"
                  >
                    {album.vydano} {album.name}
                  </Link>

                </li>
              ))}

            </ul>

          </div>
        );

      })}

    </aside>
  );
}