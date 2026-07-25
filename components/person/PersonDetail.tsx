import { formatDate } from "@/lib/helpers/dates";

import type { Person } from "@/types/person";

type PersonDetailProps = {
  person: Person;
};

export default function PersonDetail({
  person,
}: PersonDetailProps) {
  return (
    <main className="rounded bg-zinc-900 p-6">

      <h1 className="mb-6 text-4xl font-bold text-red-500">
        {person.name}
      </h1>

      <div className="space-y-3 text-zinc-300">

        <div>
          <strong>Instrument:</strong> {person.instrument}
        </div>

        <div>
          <strong>Born:</strong>{" "}
          {formatDate(person.date_of_birth)}
        </div>

        {person.date_of_dead && (
          <div>
            <strong>Died:</strong>{" "}
            {formatDate(person.date_of_dead)}
          </div>
        )}

        <div>
          <strong>Birth place:</strong>{" "}
          {person.place_of_birth}
        </div>

        <div>
          <strong>Activity:</strong>{" "}
          {person.pusobeni}
        </div>

      </div>

      {person.text && (
        <section className="mt-8">

          <h2 className="mb-3 border-b border-zinc-700 pb-2 text-2xl font-semibold text-red-500">
            Biography
          </h2>

          <div
            className="prose prose-invert max-w-none text-zinc-300"
            dangerouslySetInnerHTML={{
              __html: person.text,
            }}
          />

        </section>
      )}

    </main>
  );
}