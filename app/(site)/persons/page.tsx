import PersonList from "@/components/person/PersonList";

import { getPersonsByLetter } from "@/lib/services/persons";

type PersonsPageProps = {
  searchParams: Promise<{
    letter?: string;
  }>;
};

export default async function PersonsPage({
  searchParams,
}: PersonsPageProps) {
  const { letter = "A" } = await searchParams;

  const persons = await getPersonsByLetter(letter);

  return (
    <PersonList
      letter={letter}
      persons={persons}
    />
  );
}