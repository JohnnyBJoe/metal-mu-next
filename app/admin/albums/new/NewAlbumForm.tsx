"use client";

import { useState } from "react";

type Band = {
  id_i: number;
  name: string;
};

type Props = {
  bands: Band[];
};

const albumTypes = [
  { value: "1", label: "Studio albums" },
  { value: "2", label: "Live albums" },
  { value: "3", label: "Compilations" },
  { value: "4", label: "Videos" },
  { value: "5", label: "EP" },
  { value: "6", label: "SP" },
  { value: "7", label: "Split" },
  { value: "8", label: "Demo" },
  { value: "9", label: "Bootlegs" },
];

export default function NewAlbumForm({
  bands,
}: Props) {
  const [interpret, setInterpret] = useState("");
  const [name, setName] = useState("");
  const [type, setType] = useState("1");
  const [vydano, setVydano] = useState("");
  const [label, setLabel] = useState("");
  const [info, setInfo] = useState("");
  const [obal, setObal] = useState("");

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
        "/api/admin/albums",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            interpret,
            name,
            type,
            vydano,
            label,
            info,
            obal,
          }),
        }
      );

      const data = await response.json();

      if (!response.ok) {
        setError(
          data.error ??
            "Failed to create album."
        );

        setSaving(false);
        return;
      }

      window.location.href =
        "/admin/albums";
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
              Add Album
            </h1>

            <p className="mt-2 text-zinc-400">
              Add a new album or release to Rock&Metal Book.
            </p>
          </div>

          <a
            href="/admin/albums"
            className="text-sm text-zinc-400 hover:text-red-500"
          >
            ← Albums
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

              <div>
                <label className="mb-2 block text-sm font-semibold text-zinc-300">
                  Album name
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
                  Type
                </label>

                <select
                  value={type}
                  onChange={(event) =>
                    setType(event.target.value)
                  }
                  required
                  className="w-full rounded border border-zinc-700 bg-zinc-950 px-3 py-2 text-sm text-white focus:border-red-600 focus:outline-none"
                >
                  {albumTypes.map((item) => (
                    <option
                      key={item.value}
                      value={item.value}
                    >
                      {item.label}
                    </option>
                  ))}
                </select>
              </div>

            </div>
          </section>

          {/* Release information */}

          <section>
            <h2 className="mb-5 border-b border-zinc-800 pb-3 text-xl font-semibold">
              Release information
            </h2>

            <div className="space-y-5">

              <div>
                <label className="mb-2 block text-sm font-semibold text-zinc-300">
                  Released
                </label>

                <input
                  type="text"
                  value={vydano}
                  onChange={(event) =>
                    setVydano(event.target.value)
                  }
                  maxLength={10}
                  placeholder="e.g. 1985 or 1985/86"
                  className="w-full rounded border border-zinc-700 bg-zinc-950 px-3 py-2 text-sm text-white placeholder:text-zinc-600 focus:border-red-600 focus:outline-none"
                />

                <p className="mt-2 text-xs text-zinc-500">
                  Enter the release information as known, for example 1985 or 1985/86.
                </p>
              </div>

              <div>
                <label className="mb-2 block text-sm font-semibold text-zinc-300">
                  Label
                </label>

                <textarea
                  value={label}
                  onChange={(event) =>
                    setLabel(event.target.value)
                  }
                  rows={3}
                  className="w-full resize-y rounded border border-zinc-700 bg-zinc-950 px-3 py-2 text-sm text-white focus:border-red-600 focus:outline-none"
                />
              </div>

            </div>
          </section>

          {/* Information */}

          <section>
            <h2 className="mb-5 border-b border-zinc-800 pb-3 text-xl font-semibold">
              Information
            </h2>

            <textarea
              value={info}
              onChange={(event) =>
                setInfo(event.target.value)
              }
              rows={10}
              className="w-full resize-y rounded border border-zinc-700 bg-zinc-950 px-3 py-2 text-sm text-white focus:border-red-600 focus:outline-none"
            />
          </section>

          {/* Cover */}

          <section>
            <h2 className="mb-5 border-b border-zinc-800 pb-3 text-xl font-semibold">
              Cover
            </h2>

            <label className="mb-2 block text-sm font-semibold text-zinc-300">
              Cover filename
            </label>

            <input
              type="text"
              value={obal}
              onChange={(event) =>
                setObal(event.target.value)
              }
              placeholder="album-cover.jpg"
              className="w-full rounded border border-zinc-700 bg-zinc-950 px-3 py-2 text-sm text-white placeholder:text-zinc-600 focus:border-red-600 focus:outline-none"
            />

            <p className="mt-3 text-xs text-zinc-500">
              Image uploading will be added later.
            </p>
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
                : "Add Album"}
            </button>

            <a
              href="/admin/albums"
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