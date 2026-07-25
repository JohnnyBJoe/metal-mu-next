import Link from "next/link";

type PersonListItem = {
  id_m: number;
  name: string;
  instrument: string;
  interpret: number;
};

type PersonListProps = {
  letter: string;
  persons: PersonListItem[];
};

export default function PersonList({
  letter,
  persons,
}: PersonListProps) {
  return (
    <main className="rounded bg-zinc-900 p-6">
      <h1 className="mb-6 text-4xl font-bold text-red-500">
        Musicians – {letter}
      </h1>

      <ul className="space-y-2">
        {persons.map((person) => (
          <li
            key={person.id_m}
            className="rounded border border-zinc-800 bg-zinc-950 px-4 py-2 hover:border-red-500"
          >
            <Link
              href={`/person/${person.id_m}`}
              className="block"
            >
              <div className="font-semibold text-white hover:text-red-500">
                {person.name}
              </div>

              <div className="text-sm text-zinc-400">
                {person.instrument}
              </div>
            </Link>
          </li>
        ))}
      </ul>
    </main>
  );
}