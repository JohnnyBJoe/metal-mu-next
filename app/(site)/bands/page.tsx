import Header from "@/components/layout/Header";
import CatalogLayout from "@/components/catalog/CatalogLayout";

import LeftPanel from "@/components/layout/LeftPanel";
import CenterPanel from "@/components/layout/CenterPanel";
import RightPanel from "@/components/layout/RightPanel";
import AlbumDetail from "@/components/album/AlbumDetail";

import { getHomeData } from "@/lib/services/home";

type Props = {
  searchParams: Promise<{
    letter?: string;
    band?: string;
    album?: string;
    track?: string;
    page?: string;
  }>;
};

export default async function BandsPage({
  searchParams,
}: Props) {

  const params = await searchParams;

  const data = await getHomeData(params);

  return (
    <div className="min-h-screen bg-zinc-950 text-white">

      <Header />

      <CatalogLayout

        left={
          <LeftPanel
            bands={data.bands}
            selectedId={
              params.band
                ? Number(params.band)
                : undefined
            }
            currentPage={data.currentPage}
            totalItems={data.totalBands}
            currentLetter={data.currentLetter}
            baseUrl="/bands"
          />
        }

        center={
          data.selectedAlbum ? (
            <AlbumDetail
              letter={data.currentLetter}
              album={data.selectedAlbum}
              albumTracks={data.albumTracks}
              selectedTrack={data.selectedTrack}
              baseUrl="/bands"
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
            bandId={
              params.band
                ? Number(params.band)
                : null
            }
            albumId={
              params.album
                ? Number(params.album)
                : null
            }
            albums={data.discography}
            baseUrl="/bands"
            currentPage={data.currentPage}
          />
        }

      />

    </div>
  );
}