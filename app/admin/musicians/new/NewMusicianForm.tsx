"use client";

import { useState } from "react";

type Band = {
  id_i: number;
  name: string;
};

type Props = {
  bands: Band[];
};

export default function NewMusicianForm({
  bands,
}: Props) {
  const [name, setName] = useState("");
  const [realName, setRealName] = useState("");
  const [instrument, setInstrument] = useState("");
  const [interpret, setInterpret] = useState("");

  const [birthYear, setBirthYear] = useState("");
  const [placeOfBirth, setPlaceOfBirth] =
    useState("");
  const [deathYear, setDeathYear] = useState("");

  const [pusobeni, setPusobeni] = useState("");
  const [status, setStatus] = useState("0");

  const [text, setText] = useState("");

  const [error, setError] = useState("");
  const [saving, setSaving] = useState(false);

  async function handleSubmit(
    event: React.FormEvent<HTMLFormElement>
  ) {
    event.preventDefault();

    setError("");
    setSaving(true);

    try {
      const response = await fetch(
        "/api/admin/musicians",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            name,
            realName,
            instrument,
            interpret,
            birthYear,
            placeOfBirth,
            deathYear,
            pusobeni,
            status,
            text,
          }),
        }
      );

      const data = await response.json();

      if (!response.ok) {
        setError(
          data.error ??
            "Failed to create musician."
        );

        setSaving(false);
        return;
      }

      window.location.href =
        "/admin/musicians";
    } catch {
      setError(
        "An unexpected error occurred."
      );

      setSaving(false);
    }
  }

  return (
    <main className="min-h-screen bg-zinc-950 px-6 py-8 text-white">
      <div className="mx-auto max-w-4xl">

        <div className="mb-8 flex items-center justify-between">

          <div>
            <h1 className="text-4xl font-bold text-red-500">
              Add Musician
            </h1>

            <p className="mt-2 text-zinc-400">
              Add a new musician to Rock&Metal Book.
            </p>
          </div>

          <a
            href="/admin/musicians"
            className="text-sm text-zinc-400 hover:text-red-500"
          >
            ← Musicians
          </a>

        </div>

        <form
          onSubmit={handleSubmit}
          className="space-y-8 rounded border border-zinc-800 bg-zinc-900 p-6"
        >

          {/* Basic information */}

          <section>
            <h2 className="mb-5 border-b border-zinc-800 pb-3 text-xl font-semibold">
              Basic information
            </h2>

            <div className="space-y-5">

              <div>
                <label className="mb-2 block text-sm font-semibold text-zinc-300">
                  Name
                </label>

                <input
                  type="text"
                  value={name}
                  onChange={(event) =>
                    setName(event.target.value)
                  }
                  required
                  className="w-full rounded border border-zinc-700 bg-zinc-950 px-3 py-2 text-sm text-white focus:border-red-600 focus:outline-none"
                />
              </div>

              <div>
                <label className="mb-2 block text-sm font-semibold text-zinc-300">
                  Real name
                </label>

                <input
                  type="text"
                  value={realName}
                  onChange={(event) =>
                    setRealName(event.target.value)
                  }
                  className="w-full rounded border border-zinc-700 bg-zinc-950 px-3 py-2 text-sm text-white focus:border-red-600 focus:outline-none"
                />
              </div>

              <div>
                <label className="mb-2 block text-sm font-semibold text-zinc-300">
                  Instrument
                </label>

                <input
                  type="text"
                  value={instrument}
                  onChange={(event) =>
                    setInstrument(event.target.value)
                  }
                  required
                  className="w-full rounded border border-zinc-700 bg-zinc-950 px-3 py-2 text-sm text-white focus:border-red-600 focus:outline-none"
                />
              </div>

              <div>
                <label className="mb-2 block text-sm font-semibold text-zinc-300">
                  Band
                </label>

                <select
                  value={interpret}
                  onChange={(event) =>
                    setInterpret(event.target.value)
                  }
                  required
                  className="w-full rounded border border-zinc-700 bg-zinc-950 px-3 py-2 text-sm text-white focus:border-red-600 focus:outline-none"
                >
                  <option value="" disabled>
                    Select band
                  </option>

                  {bands.map((band) => (
                    <option
                      key={band.id_i}
                      value={band.id_i}
                    >
                      {band.name}
                    </option>
                  ))}
                </select>
              </div>

            </div>
          </section>

          {/* Personal information */}

          <section>
            <h2 className="mb-5 border-b border-zinc-800 pb-3 text-xl font-semibold">
              Personal information
            </h2>

            <div className="space-y-5">

              <div>
                <label className="mb-2 block text-sm font-semibold text-zinc-300">
                  Year of birth
                </label>

                <input
                  type="number"
                  min="1"
                  max="9999"
                  value={birthYear}
                  onChange={(event) =>
                    setBirthYear(event.target.value)
                  }
                  placeholder="e.g. 1950"
                  className="w-full rounded border border-zinc-700 bg-zinc-950 px-3 py-2 text-sm text-white placeholder:text-zinc-600 focus:border-red-600 focus:outline-none"
                />

                <p className="mt-2 text-xs text-zinc-500">
                  Enter only the year if the exact date is unknown.
                </p>
              </div>

              <div>
                <label className="mb-2 block text-sm font-semibold text-zinc-300">
                  Place of birth
                </label>

                <input
                  type="text"
                  value={placeOfBirth}
                  onChange={(event) =>
                    setPlaceOfBirth(event.target.value)
                  }
                  className="w-full rounded border border-zinc-700 bg-zinc-950 px-3 py-2 text-sm text-white focus:border-red-600 focus:outline-none"
                />
              </div>

              <div>
                <label className="mb-2 block text-sm font-semibold text-zinc-300">
                  Year of death
                </label>

                <input
                  type="number"
                  min="1"
                  max="9999"
                  value={deathYear}
                  onChange={(event) =>
                    setDeathYear(event.target.value)
                  }
                  placeholder="e.g. 2020"
                  className="w-full rounded border border-zinc-700 bg-zinc-950 px-3 py-2 text-sm text-white placeholder:text-zinc-600 focus:border-red-600 focus:outline-none"
                />

                <p className="mt-2 text-xs text-zinc-500">
                  Leave empty if the musician is alive or the year is unknown.
                </p>
              </div>

            </div>
          </section>

          {/* Career */}

          <section>
            <h2 className="mb-5 border-b border-zinc-800 pb-3 text-xl font-semibold">
              Career
            </h2>

            <div className="space-y-5">

              <div>
                <label className="mb-2 block text-sm font-semibold text-zinc-300">
                  Period / activity
                </label>

                <input
                  type="text"
                  value={pusobeni}
                  onChange={(event) =>
                    setPusobeni(event.target.value)
                  }
                  placeholder="e.g. 1975–1982"
                  className="w-full rounded border border-zinc-700 bg-zinc-950 px-3 py-2 text-sm text-white placeholder:text-zinc-600 focus:border-red-600 focus:outline-none"
                />
              </div>

              <div>
                <label className="mb-2 block text-sm font-semibold text-zinc-300">
                  Status
                </label>

                <select
                  value={status}
                  onChange={(event) =>
                    setStatus(event.target.value)
                  }
                  className="w-full rounded border border-zinc-700 bg-zinc-950 px-3 py-2 text-sm text-white focus:border-red-600 focus:outline-none"
                >
                  <option value="0">
                    Current member
                  </option>

                  <option value="1">
                    Former member
                  </option>
                </select>
              </div>

            </div>
          </section>

          {/* Biography */}

          <section>
            <h2 className="mb-5 border-b border-zinc-800 pb-3 text-xl font-semibold">
              Biography
            </h2>

            <div>
              <label className="mb-2 block text-sm font-semibold text-zinc-300">
                Information
              </label>

              <textarea
                value={text}
                onChange={(event) =>
                  setText(event.target.value)
                }
                rows={12}
                className="w-full resize-y rounded border border-zinc-700 bg-zinc-950 px-3 py-2 text-sm text-white focus:border-red-600 focus:outline-none"
              />
            </div>
          </section>

          {error && (
            <div className="rounded border border-red-900 bg-red-950/30 p-3 text-sm text-red-400">
              {error}
            </div>
          )}

          {/* Actions */}

          <div className="flex items-center gap-4 border-t border-zinc-800 pt-6">

            <button
              type="submit"
              disabled={saving}
              className="rounded bg-red-600 px-5 py-2 text-sm font-semibold text-white hover:bg-red-500 disabled:cursor-not-allowed disabled:opacity-50"
            >
              {saving
                ? "Saving..."
                : "Add Musician"}
            </button>

            <a
              href="/admin/musicians"
              className="text-sm text-zinc-400 hover:text-white"
            >
              Cancel
            </a>

          </div>

        </form>
      </div>
    </main>
  );
}