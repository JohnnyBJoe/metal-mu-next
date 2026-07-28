import Link from "next/link";

type AlbumMember = {
  member: number | null;
  role: string;
  credited_as: string;
  position: number;
  person: {
    id_m: number;
    name: string;
  } | null;
};

type AlbumMemberListProps = {
  title: string;
  members: AlbumMember[];
};

export default function AlbumMemberList({
  title,
  members,
}: AlbumMemberListProps) {
  if (members.length === 0) {
    return null;
  }

  return (
    <section className="mt-8">
      <h2 className="mb-3 border-b border-zinc-700 pb-2 text-2xl font-semibold text-red-500">
        {title}
      </h2>

      <ul className="space-y-3">
        {members.map((item) => (
          <li
            key={`${item.member}-${item.position}`}
            className="grid grid-cols-[260px_1fr] gap-4 border-b border-zinc-800 pb-2"
          >
            <div>
              {item.person ? (
                <Link
                  href={`/persons?letter=${item.person.name.charAt(0)}&person=${item.person.id_m}`}
                  className="font-medium text-red-500 hover:underline"
                >
                  {item.person.name}
                </Link>
              ) : (
                <span>{item.credited_as}</span>
              )}
            </div>

            <div className="text-zinc-400">
              {item.role}
            </div>
          </li>
        ))}
      </ul>
    </section>
  );
}