// Metal MU 2.0
// Version: v0.2

import type { Member } from "@/types/member";
import { getInstrumentWeight } from "@/lib/utils/instruments";

type MembersProps = {
  current: Member[];
  previous: Member[];
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
}: {
  title: string;
  members: Member[];
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
            <span className="font-medium text-white">
              {member.name}
            </span>

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
}: MembersProps) {
  return (
    <>
      <MemberList
        title="Last known line-up"
        members={current}
      />

      <MemberList
        title="Previous members"
        members={previous}
      />
    </>
  );
}