import Link from "next/link";

type AlbumItem = {
  system_discography: {
    id_d: number;
    interpret: number;
    name: string;
    vydano: string | null;
    type: number;
  };
};

type PersonAlbumsProps = {
  albums: AlbumItem[];

  letter: string;
  personId?: number;
  currentPage?: number;

  albumId?: number;
};

export default function PersonAlbums({
  albums,
  letter,
  personId,
  currentPage = 1,
  albumId,
}: PersonAlbumsProps) {
  return (
    <aside className="rounded bg-zinc-900 p-4 h-[calc(100vh-110px)] overflow-y-auto">

      <h2 className="mb-2 text-2xl font-bold text-red-500">
        Releases
      </h2>

      <div className="mb-3 border-b border-zinc-700 pb-2 text-sm text-zinc-400">
        {albums.length} releases
      </div>

      {albums.length === 0 ? (
        <p className="text-zinc-500">
          No releases found.
        </p>
      ) : (
        <ul className="space-y-0.5">
          {albums.map(({ system_discography: album }) => {
            const active = album.id_d === albumId;

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
                  href={`/persons?letter=${letter}&page=${currentPage}&person=${personId}&album=${album.id_d}`}
                  className={
                    active
                      ? "block text-sm leading-4 text-white"
                      : "block text-sm leading-4 text-white hover:text-red-500"
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
      )}

    </aside>
  );
}