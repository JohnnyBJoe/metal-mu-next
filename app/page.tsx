import Header from "@/components/layout/Header";
import CatalogLayout from "@/components/catalog/CatalogLayout";

import LeftPanel from "@/components/layout/LeftPanel";
import CenterPanel from "@/components/layout/CenterPanel";
import RightPanel from "@/components/layout/RightPanel";
import AlbumDetail from "@/components/album/AlbumDetail";

import { getHomeData } from "@/lib/services/home";

type HomeProps = {
  searchParams: Promise<{
    letter?: string;
    page?: string;
    band?: string;
    album?: string;
    track?: string;
  }>;
};

export default async function Home({
  searchParams,
}: HomeProps) {
  const {
    letter,
    page,
    band,
    album,
    track,
  } = await searchParams;

  const data = await getHomeData({
    letter,
    page,
    band,
    album,
    track,
  });

  return (
    <div className="min-h-screen bg-zinc-950 text-white">

      <Header />

      <CatalogLayout
        left={
          <LeftPanel
            letter={data.currentLetter}
            bands={data.bands}
            countLabel={`${data.totalBands} bands`}
            selectedId={band ? Number(band) : undefined}
            currentPage={data.currentPage}
            totalItems={data.totalBands}
          />
        }

        center={
          data.selectedAlbum ? (
            <AlbumDetail
              letter={data.currentLetter}
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
          )
        }

        right={
          <RightPanel
            letter={data.currentLetter}
            bandId={band ? Number(band) : null}
            albumId={album ? Number(album) : null}
            albums={data.discography}
            currentPage={data.currentPage}
          />
        }
      />

    </div>
  );
}