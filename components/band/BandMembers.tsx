// Metal MU 2.0
// Version: v0.3

import type { Member } from "@/types/member";
import { getInstrumentWeight } from "@/lib/utils/instruments";
import Link from "next/link";

type MembersProps = {
  current: Member[];
  previous: Member[];

  letter: string;
  currentPage: number;
};

function sortMembers(a: Member, b: Member) {
  const diff =
    getInstrumentWeight(a.instrument) -
    getInstrumentWeight(b.instrument);

  if (diff !== 0) {
    return diff;
  }

  return a.name.localeCompare(b.name);
}

function MemberList({
  title,
  members,
  letter,
  currentPage,
}: {
  title: string;
  members: Member[];
  letter: string;
  currentPage: number;
}) {
  if (members.length === 0) {
    return null;
  }

  const sorted = [...members].sort(sortMembers);

  return (
    <section className="mb-8">
      <h2 className="mb-3 border-b border-zinc-700 pb-2 text-2xl font-semibold text-red-500">
        {title}
      </h2>

      <ul className="space-y-2">
        {sorted.map((member) => (
          <li
            key={member.id_m}
            className="text-zinc-300"
          >
            <Link
              href={`/persons?letter=${member.letter}&page=${currentPage}&person=${member.id_m}`}
              className="font-medium text-white hover:text-red-500"
            >
              {member.name}
            </Link>

            {" — "}

            <span className="text-zinc-400">
              {member.instrument}
            </span>

            {member.pusobeni && (
              <>
                {" "}
                <span className="text-zinc-500">
                  ({member.pusobeni})
                </span>
              </>
            )}
          </li>
        ))}
      </ul>
    </section>
  );
}

export default function BandMembers({
  current,
  previous,
  letter,
  currentPage,
}: MembersProps) {
  return (
    <>
      <MemberList
        title="Last known line-up"
        members={current}
        letter={letter}
        currentPage={currentPage}
      />

      <MemberList
        title="Previous members"
        members={previous}
        letter={letter}
        currentPage={currentPage}
      />
    </>
  );
}