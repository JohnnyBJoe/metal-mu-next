import Header from "@/components/layout/Header";
import LeftPanel from "@/components/layout/LeftPanel";
import CenterPanel from "@/components/layout/CenterPanel";
import RightPanel from "@/components/layout/RightPanel";
import AlbumDetail from "@/components/album/AlbumDetail";

import { getHomeData } from "@/lib/services/home";

type HomeProps = {
  searchParams: Promise<{
    letter?: string;
    band?: string;
    album?: string;
    track?: string;
  }>;
};

export default async function Home({
  searchParams,
}: HomeProps) {

  const {
    letter = "A",
    band,
    album,
    track,
  } = await searchParams;

  const data = await getHomeData({
    letter,
    band,
    album,
    track,
  });

  return (
    <div className="min-h-screen bg-zinc-950 text-white">

      <Header />

      <div className="grid grid-cols-12 gap-4 p-4">

        <div className="col-span-2">
          <LeftPanel bands={data.bands} />
        </div>

        <div className="col-span-8">

          {data.selectedAlbum ? (

            <AlbumDetail
              letter={letter}
              album={data.selectedAlbum}
              albumTracks={data.albumTracks}
              selectedTrack={data.selectedTrack}
            />

          ) : (

            <CenterPanel
              band={data.selectedBand}
              styles={data.styles}
              countries={data.countries}
              members={data.members}
            />

          )}

        </div>

        <div className="col-span-2">

          <RightPanel
            letter={letter}
            bandId={band ? Number(band) : null}
            albumId={album ? Number(album) : null}
            albums={data.discography}
          />

        </div>

      </div>

    </div>
  );
}