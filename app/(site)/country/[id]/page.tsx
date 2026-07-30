import Header from "@/components/layout/Header";
import CatalogLayout from "@/components/catalog/CatalogLayout";

import LeftPanel from "@/components/layout/LeftPanel";
import CenterPanel from "@/components/layout/CenterPanel";
import RightPanel from "@/components/layout/RightPanel";
import AlbumDetail from "@/components/album/AlbumDetail";

import { prisma } from "@/lib/prisma";

import {
  getCountry,
  getCountryBands,
} from "@/lib/services/countries";

import { getBand } from "@/lib/services/bands";
import { getMembers } from "@/lib/services/members";

import {
  getDiscography,
  getAlbum,
} from "@/lib/services/albums";

import {
  getTracks,
  getTrack,
} from "@/lib/services/tracks";

type Props = {
  params: Promise<{
    id: string;
  }>;

  searchParams: Promise<{
  page?: string;
  band?: string;
  album?: string;
  track?: string;
}>;
};

export default async function CountryPage({
  params,
  searchParams,
}: Props) {

  const { id } = await params;

  const country = await getCountry(Number(id));

  const {
    page,
    band,
    album,
    track,
  } = await searchParams;

  const pageNumber = page ? Number(page) : 1;
  searchParams.page
    ? Number(searchParams.page)
    : 1;

const {
  items: bands,
  total,
} = await getCountryBands(
  Number(id),
  pageNumber
);

  const selectedBand =
    band
      ? await getBand(Number(band))
      : null;

  const members =
    band
      ? await getMembers(Number(band))
      : {
          current: [],
          previous: [],
        };

  const styles =
    await prisma.system_styles.findMany({
      orderBy: {
        id_s: "asc",
      },
    });

  const countries =
    await prisma.system_countries.findMany({
      orderBy: {
        text: "asc",
      },
    });

  const discography =
    band
      ? await getDiscography(Number(band))
      : [];

  const selectedAlbum =
    album
      ? await getAlbum(Number(album))
      : null;

  const albumTracks =
    album
      ? await getTracks(Number(album))
      : [];

  const selectedTrack =
    track
      ? await getTrack(Number(track))
      : null;

  return (
    <div className="min-h-screen bg-zinc-950 text-white">

      <Header />

      <CatalogLayout

        left={
          <LeftPanel
  bands={bands}
  baseUrl={`/country/${id}`}
  subtitle={country?.text}
  selectedId={band ? Number(band) : undefined}
  currentPage={pageNumber}
  totalItems={total}
/>
        }

        center={
          selectedAlbum ? (
            <AlbumDetail
              letter=""
              album={selectedAlbum}
              albumTracks={albumTracks}
              selectedTrack={selectedTrack}
            />
          ) : (
            <CenterPanel
              band={selectedBand}
              styles={styles}
              countries={countries}
              members={members}
            />
          )
        }

        right={
          <RightPanel
  bandId={band ? Number(band) : null}
  albumId={album ? Number(album) : null}
  albums={discography}
  baseUrl={`/country/${id}`}
  currentPage={pageNumber}
/>
        }

      />

    </div>
  );
}