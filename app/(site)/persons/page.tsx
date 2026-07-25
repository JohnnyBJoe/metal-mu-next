import { notFound } from "next/navigation";

import PersonList from "@/components/person/PersonList";
import PersonDetail from "@/components/person/PersonDetail";

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

  if (!person) {
    return (
      <PersonList
        letter={letter}
        persons={persons}
      />
    );
  }

  const selectedPerson = await getPerson(
    Number(person)
  );

  if (!selectedPerson) {
    notFound();
  }

  return (
    <PersonDetail person={selectedPerson} />
  );
}