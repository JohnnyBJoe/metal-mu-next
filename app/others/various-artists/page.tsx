import Header from "@/components/layout/Header";

import AlbumDetail from "@/components/album/AlbumDetail";

import {
  getVariousArtists,
  getVariousArtistsAlbums,
  getAlbum,
} from "@/lib/services/albums";

import { getTracks } from "@/lib/services/tracks";

type Props = {
  searchParams: Promise<{
    album?: string;
  }>;
};

export default async function VariousArtistsPage({
  searchParams,
}: Props) {
  const { album } = await searchParams;

  const variousArtists = await getVariousArtists();

  if (!variousArtists) {
    return (
      <div className="min-h-screen bg-zinc-950 text-white">
        <Header />

        <main className="mx-auto max-w-7xl px-6 py-8">
          <h1 className="mb-6 text-4xl font-bold text-red-500">
            Various Artists
          </h1>

          <p className="text-zinc-400">
            No Various Artists albums are available yet.
          </p>
        </main>
      </div>
    );
  }

  const albums = await getVariousArtistsAlbums(
    variousArtists.id_i
  );

  const selectedAlbum = album
    ? await getAlbum(Number(album))
    : null;

  const albumTracks = selectedAlbum
    ? await getTracks(selectedAlbum.id_d)
    : [];

  return (
    <div className="min-h-screen bg-zinc-950 text-white">
      <Header />

      <main className="mx-auto max-w-7xl px-6 py-8">

        <div className="grid grid-cols-12 gap-4">

          <aside className="col-span-3 rounded bg-zinc-900 p-4">

            <h1 className="mb-2 text-2xl font-bold text-red-500">
              Various Artists
            </h1>

            <div className="mb-4 border-b border-zinc-700 pb-3 text-sm text-zinc-400">
              {albums.length} albums
            </div>

            <div className="space-y-1">

              {albums.map((item) => (
                <a
                  key={item.id_d}
                  href={`/others/various-artists?album=${item.id_d}`}
                  className={
                    selectedAlbum?.id_d === item.id_d
                      ? "block rounded border-l-4 border-red-600 bg-red-950/30 px-3 py-2 text-sm text-white"
                      : "block rounded border border-zinc-800 px-3 py-2 text-sm text-white hover:bg-zinc-800 hover:text-red-500"
                  }
                >
                  <div>
                    {item.name}
                  </div>

                  {item.vydano && (
                    <div className="mt-1 text-xs text-zinc-500">
                      {item.vydano}
                    </div>
                  )}
                </a>
              ))}

            </div>

          </aside>

          <main className="col-span-9 rounded bg-zinc-900 p-6">

            {selectedAlbum ? (
              <AlbumDetail
                letter=""
                album={selectedAlbum}
                albumTracks={albumTracks}
                selectedTrack={null}
                baseUrl="/others/various-artists"
              />
            ) : (
              <div>
                <h2 className="mb-6 text-4xl font-bold text-red-500">
                  Various Artists
                </h2>

                <p className="text-zinc-400">
                  Select an album from the left panel.
                </p>
              </div>
            )}

          </main>

        </div>

      </main>
    </div>
  );
}