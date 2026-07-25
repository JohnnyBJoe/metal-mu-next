import Link from "next/link";

type PersonSidebarItem = {
  id_m: number;
  name: string;
};

type PersonSidebarProps = {
  letter: string;
  persons: PersonSidebarItem[];
};

export default function PersonSidebar({
  letter,
  persons,
}: PersonSidebarProps) {
  return (
    <aside className="rounded bg-zinc-900 p-4 h-[calc(100vh-110px)] overflow-y-auto">
      <h2 className="mb-4 text-lg font-semibold text-red-500">
        Musicians
      </h2>

      <ul className="space-y-2">
        {persons.map((person) => (
          <li
            key={person.id_m}
            className="rounded border border-zinc-800 p-2 hover:bg-zinc-800"
          >
            <Link
              href={`/persons?letter=${letter}&person=${person.id_m}`}
              className="block font-semibold text-white hover:text-red-500"
            >
              {person.name}
            </Link>
          </li>
        ))}
      </ul>
    </aside>
  );
}