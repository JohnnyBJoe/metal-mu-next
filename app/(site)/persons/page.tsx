import { notFound } from "next/navigation";

import Header from "@/components/layout/Header";
import CatalogLayout from "@/components/catalog/CatalogLayout";

import PersonSidebar from "@/components/person/PersonSidebar";
import PersonDetail from "@/components/person/PersonDetail";
import PersonAlbums from "@/components/person/PersonAlbums";
import AlbumDetail from "@/components/album/AlbumDetail";

import {
  getAlbum,
} from "@/lib/services/albums";

import {
  getTracks,
  getTrack,
} from "@/lib/services/tracks";

import {
  getPerson,
  getPersonsByLetter,
  getPersonAlbums,
  getPersonLetter,
  getPersonPage,
} from "@/lib/services/persons";

type PersonsPageProps = {
  searchParams: Promise<{
    letter?: string;
    page?: string;
    person?: string;
    album?: string;
    track?: string;
  }>;
};

export default async function PersonsPage({
  searchParams,
}: PersonsPageProps) {

  const {
    letter,
    page,
    person,
    album,
    track,
  } = await searchParams;

  const personId =
    person && !Number.isNaN(Number(person))
      ? Number(person)
      : null;

  let currentLetter = letter;

  if (!currentLetter && personId !== null) {
    currentLetter = await getPersonLetter(personId);
  }

  currentLetter ??= "A";

  let currentPage =
    page && !Number.isNaN(Number(page))
      ? Number(page)
      : 1;

  if (!page && personId !== null) {
    currentPage = await getPersonPage(personId);
  }

  const personData = await getPersonsByLetter(
    currentLetter,
    currentPage
  );

  const selectedPerson =
    personId
      ? await getPerson(personId)
      : null;

  if (personId && !selectedPerson) {
    notFound();
  }

  const albums =
    selectedPerson
      ? await getPersonAlbums(selectedPerson.id_m)
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
          <PersonSidebar
            letter={currentLetter}
            persons={personData.items}
            selectedId={personId ?? undefined}
            currentPage={currentPage}
            totalItems={personData.total}
          />
        }

        center={
          selectedAlbum ? (
            <AlbumDetail
              letter={currentLetter}
              album={selectedAlbum}
              albumTracks={albumTracks}
              selectedTrack={selectedTrack}
              baseUrl="/persons"
              personId={personId ?? undefined}
              currentPage={currentPage}
            />
          ) : selectedPerson ? (
            <PersonDetail person={selectedPerson} />
          ) : (
            <main className="rounded bg-zinc-900 p-6">
              <h1 className="mb-6 text-4xl font-bold text-red-500">
                Musicians
              </h1>

              <p className="text-zinc-300">
                Select a musician from the left panel.
              </p>
            </main>
          )
        }

        right={
          <PersonAlbums
            albums={albums}
            letter={currentLetter}
            personId={personId ?? undefined}
            currentPage={currentPage}
            albumId={album ? Number(album) : undefined}
          />
        }
      />

    </div>
  );
}