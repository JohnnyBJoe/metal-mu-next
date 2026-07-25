import { notFound } from "next/navigation";

import CatalogLayout from "@/components/catalog/CatalogLayout";
import PersonSidebar from "@/components/person/PersonSidebar";
import PersonDetail from "@/components/person/PersonDetail";
import PersonAlbums from "@/components/person/PersonAlbums";

import {
  getPerson,
  getPersonsByLetter,
} from "@/lib/services/persons";

type PersonsPageProps = {
  searchParams: Promise<{
    letter?: string;
    person?: string;
  }>;
};

export default async function PersonsPage({
  searchParams,
}: PersonsPageProps) {
  const {
    letter = "A",
    person,
  } = await searchParams;

  const persons = await getPersonsByLetter(letter);

  const selectedPerson = person
    ? await getPerson(Number(person))
    : null;

  if (person && !selectedPerson) {
    notFound();
  }

  return (
    <CatalogLayout
      left={
        <PersonSidebar
          letter={letter}
          persons={persons}
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
          personName={selectedPerson?.name}
        />
      }
    />
  );
}