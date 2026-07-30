import Link from "next/link";
import { buildCatalogUrl } from "@/lib/utils/catalogUrl";

type Album = {
  id_d: number;
  name: string;
  vydano: string | null;
  type: number;
};

type RightPanelProps = {
  letter?: string;
  bandId: number | null;
  albumId: number | null;
  albums: Album[];
  baseUrl?: string;

  currentPage?: number;
};

const TYPES: Record<number, string> = {
  1: "Studio",
  2: "Live",
  3: "Compilation",
  4: "Video",
  5: "EP",
  6: "Single",
  7: "Demo",  
  8: "Bootleg",
};

export default function RightPanel({
  letter,
  bandId,
  albumId,
  albums,
  baseUrl = "/",

  currentPage = 1,
}: RightPanelProps) {
  return (
    <aside className="rounded bg-zinc-900 p-4 h-[calc(100vh-110px)] overflow-y-auto">

      <h2 className="mb-2 text-2xl font-bold text-red-500">
        Discography
      </h2>

      <div className="mb-3 border-b border-zinc-700 pb-2 text-sm text-zinc-400">
        {albums.length} releases
      </div>

      {Object.entries(TYPES).map(([type, title]) => {
        const list = albums.filter(
          (album) => album.type === Number(type)
        );

        if (!list.length) {
          return null;
        }

        return (
          <div key={type} className="mb-5">

            <h3 className="mb-2 text-xs font-semibold uppercase tracking-wider text-zinc-500">
              {title}
            </h3>

            <ul className="space-y-0.5">

              {list.map((album) => {
                const active = album.id_d === albumId;

                const href =
  baseUrl === "/"
    ? buildCatalogUrl({
        letter,
        page: currentPage,
        band: bandId,
        album: album.id_d,
      })
    : `${baseUrl}?page=${currentPage}&band=${bandId}&album=${album.id_d}`;

                return (
                  <li
                    key={album.id_d}
                    className={
                      active
                        ? "rounded border-l-4 border-red-600 bg-red-950/30 px-2 py-0.5"
                        : "rounded px-2 py-0.5 hover:bg-zinc-800"
                    }
                  >
                    <Link
                      href={href}
                      className={
                        active
                          ? "block text-sm leading-4 text-white"
                          : "block text-sm leading-4 text-zinc-400 hover:text-red-500"
                      }
                    >
                      {album.vydano && (
                        <span className="mr-2 text-zinc-500">
                          {album.vydano}
                        </span>
                      )}

                      {album.name}
                    </Link>
                  </li>
                );
              })}

            </ul>

          </div>
        );
      })}

    </aside>
  );
}