import Link from "next/link";

import Pagination from "@/components/layout/Pagination";
import { PAGE_SIZE } from "@/lib/constants";

type PersonSidebarItem = {
  id_m: number;
  name: string;
};

type PersonSidebarProps = {
  letter: string;
  persons: PersonSidebarItem[];

  selectedId?: number;

  currentPage?: number;
  totalItems?: number;
};

export default function PersonSidebar({
  letter,
  persons,

  selectedId,

  currentPage = 1,
  totalItems = persons.length,
}: PersonSidebarProps) {
  return (
    <aside className="flex h-[calc(100vh-110px)] flex-col rounded bg-zinc-900 p-4">

      <h2 className="mb-2 text-2xl font-bold text-red-500">
        Musicians
      </h2>

      <div className="mb-3 border-b border-zinc-700 pb-2 text-sm text-zinc-400">
        {totalItems} musicians
      </div>

      <div className="flex-1 overflow-y-auto">

        <ul className="space-y-0.5">

          {persons.map((person) => {

            const active =
              person.id_m === selectedId;

            return (
              <li
                key={person.id_m}
                className={
                  active
                    ? "rounded border-l-4 border-red-600 bg-red-950/30 px-2 py-0.5"
                    : "rounded border border-zinc-800 px-2 py-0.5 hover:bg-zinc-800"
                }
              >
                <Link
                  href={`/persons?letter=${letter}&page=${currentPage}&person=${person.id_m}`}
                  className={
                    active
                      ? "block text-sm leading-4 text-white"
                      : "block text-sm leading-4 text-white hover:text-red-500"
                  }
                >
                  {person.name}
                </Link>
              </li>
            );
          })}

        </ul>

      </div>

      <Pagination
        currentPage={currentPage}
        totalItems={totalItems}
        pageSize={PAGE_SIZE}
        baseUrl="/persons"
        letter={letter}
      />

    </aside>
  );
}