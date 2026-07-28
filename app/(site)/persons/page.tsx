import { notFound } from "next/navigation";

import Header from "@/components/layout/Header";
import CatalogLayout from "@/components/catalog/CatalogLayout";

import PersonSidebar from "@/components/person/PersonSidebar";
import PersonDetail from "@/components/person/PersonDetail";
import PersonAlbums from "@/components/person/PersonAlbums";

import {
  getPerson,
  getPersonsByLetter,
  getPersonAlbums,
} from "@/lib/services/persons";

type PersonsPageProps = {
  searchParams: Promise<{
    letter?: string;
    page?: string;
    person?: string;
  }>;
};

export default async function PersonsPage({
  searchParams,
}: PersonsPageProps) {

  const {
    letter = "A",
    page,
    person,
  } = await searchParams;

  const currentPage =
    page && !Number.isNaN(Number(page))
      ? Number(page)
      : 1;

  const personData = await getPersonsByLetter(
    letter,
    currentPage
  );

  const selectedPerson =
    person
      ? await getPerson(Number(person))
      : null;

  if (person && !selectedPerson) {
    notFound();
  }

  const albums =
    selectedPerson
      ? await getPersonAlbums(selectedPerson.id_m)
      : [];

  return (
    <div className="min-h-screen bg-zinc-950 text-white">

      <Header />

      <CatalogLayout
        left={
          <PersonSidebar
            letter={letter}
            persons={personData.items}
            selectedId={person ? Number(person) : undefined}
            currentPage={currentPage}
            totalItems={personData.total}
          />
        }

        center={
          selectedPerson ? (
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
  letter={letter}
  personId={person ? Number(person) : undefined}
  currentPage={currentPage}
/>
        }
      />

    </div>
  );
}