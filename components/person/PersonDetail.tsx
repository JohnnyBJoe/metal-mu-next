import Link from "next/link";

import { formatDate } from "@/lib/helpers/dates";

import type { Person } from "@/types/person";

type PersonWithBand = Person & {
  bandName: string | null;
};

type PersonDetailProps = {
  person: PersonWithBand;
};

function hasValue(
  value: string | null | undefined
) {
  if (!value) {
    return false;
  }

  return value.trim().toLowerCase() !== "unknown";
}

export default function PersonDetail({
  person,
}: PersonDetailProps) {
  return (
    <main className="rounded bg-zinc-900 p-6">

      <h1 className="mb-6 text-4xl font-bold text-red-500">
        {person.name}
      </h1>

      <div className="space-y-3 text-zinc-300">

        {hasValue(person.real_name) && (
          <div>
            <strong>Real name:</strong>{" "}
            {person.real_name}
          </div>
        )}

        {hasValue(person.instrument) && (
          <div>
            <strong>Instrument:</strong>{" "}
            {person.instrument}
          </div>
        )}

        {person.date_of_birth && (
          <div>
            <strong>Born:</strong>{" "}
            {formatDate(person.date_of_birth)}
          </div>
        )}

        {person.date_of_dead && (
          <div>
            <strong>Died:</strong>{" "}
            {formatDate(person.date_of_dead)}
          </div>
        )}

        {hasValue(person.place_of_birth) && (
          <div>
            <strong>Birth place:</strong>{" "}
            {person.place_of_birth}
          </div>
        )}

        {person.bandName && (
          <div>
            <strong>Band:</strong>

            <div className="ml-4 mt-1">
              <Link
                href={`/bands?band=${person.interpret}`}
                className="text-red-500 hover:underline"
              >
                {person.bandName}
              </Link>

              {hasValue(person.pusobeni) && (
                <div className="text-sm text-zinc-500">
                  {person.pusobeni}
                </div>
              )}
            </div>
          </div>
        )}

      </div>

      {person.text && (
        <section className="mt-8">

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