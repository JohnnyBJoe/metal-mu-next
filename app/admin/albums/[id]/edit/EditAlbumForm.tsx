"use client";

import { useState } from "react";

type Band = {
  id_i: number;
  name: string;
};

type Album = {
  id_d: number;
  interpret: number;
  name: string;
  type: number;
  info: string;
  vydano: string | null;
  obal: string;
  label: string;
};
type Track = {
  id_t: number;
  name: string;
  lyric: string;
};
type Props = {
  album: Album;
  bands: Band[];
  tracks: Track[];
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

export default function EditAlbumForm({
  album,
  bands,
  tracks,

}: Props) {
  const [interpret, setInterpret] = useState(
    String(album.interpret)
  );

  const [name, setName] = useState(
    album.name
  );

  const [type, setType] = useState(
    String(album.type)
  );

  const [vydano, setVydano] = useState(
    album.vydano ?? ""
  );

  const [label, setLabel] = useState(
    album.label
  );

  const [info, setInfo] = useState(
    album.info
  );

  const [obal, setObal] = useState(
    album.obal
  );
const [newTrackName, setNewTrackName] = useState("");
const [newTrackLyric, setNewTrackLyric] = useState("");
const [trackError, setTrackError] = useState("");
const [addingTrack, setAddingTrack] = useState(false);
const [editingTrackId, setEditingTrackId] = useState<number | null>(
  null
);

const [editingTrackName, setEditingTrackName] = useState("");
const [editingTrackLyric, setEditingTrackLyric] = useState("");

const [savingTrackId, setSavingTrackId] = useState<number | null>(
  null
);

const [deletingTrackId, setDeletingTrackId] = useState<number | null>(
  null
);
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
        `/api/admin/albums/${album.id_d}`,
        {
          method: "PATCH",
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
            "Failed to update album."
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
async function handleAddTrack() {
  setTrackError("");

  const trackName = newTrackName.trim();

  if (!trackName) {
    setTrackError("Track name is required.");
    return;
  }

  setAddingTrack(true);

  try {
    const response = await fetch(
      `/api/admin/albums/${album.id_d}/tracks`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          name: trackName,
          lyric: newTrackLyric,
        }),
      }
    );

    const data = await response.json();

    if (!response.ok) {
      setTrackError(
        data.error ?? "Failed to create track."
      );

      setAddingTrack(false);
      return;
    }

    window.location.reload();
  } catch {
    setTrackError(
      "An unexpected error occurred."
    );

    setAddingTrack(false);
  }
}
function startEditingTrack(track: Track) {
  setEditingTrackId(track.id_t);
  setEditingTrackName(track.name);
  setEditingTrackLyric(track.lyric);
  setTrackError("");
}

function cancelEditingTrack() {
  setEditingTrackId(null);
  setEditingTrackName("");
  setEditingTrackLyric("");
  setTrackError("");
}

async function handleSaveTrack(trackId: number) {
  setTrackError("");

  const trackName = editingTrackName.trim();

  if (!trackName) {
    setTrackError("Track name is required.");
    return;
  }

  setSavingTrackId(trackId);

  try {
    const response = await fetch(
      `/api/admin/albums/${album.id_d}/tracks`,
      {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          id_t: trackId,
          name: trackName,
          lyric: editingTrackLyric,
        }),
      }
    );

    const data = await response.json();

    if (!response.ok) {
      setTrackError(
        data.error ?? "Failed to update track."
      );

      setSavingTrackId(null);
      return;
    }

    window.location.reload();
  } catch {
    setTrackError(
      "An unexpected error occurred."
    );

    setSavingTrackId(null);
  }
}

async function handleDeleteTrack(trackId: number) {
  const confirmed = window.confirm(
    "Are you sure you want to delete this track?"
  );

  if (!confirmed) {
    return;
  }

  setTrackError("");
  setDeletingTrackId(trackId);

  try {
    const response = await fetch(
      `/api/admin/albums/${album.id_d}/tracks`,
      {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          id_t: trackId,
        }),
      }
    );

    const data = await response.json();

    if (!response.ok) {
      setTrackError(
        data.error ?? "Failed to delete track."
      );

      setDeletingTrackId(null);
      return;
    }

    window.location.reload();
  } catch {
    setTrackError(
      "An unexpected error occurred."
    );

    setDeletingTrackId(null);
  }
}
  return (
    <main className="min-h-screen bg-zinc-950 px-6 py-8 text-white">
      <div className="mx-auto max-w-4xl">

        <div className="mb-8 flex items-center justify-between">

          <div>
            <h1 className="text-4xl font-bold text-red-500">
              Edit Album
            </h1>

            <p className="mt-2 text-zinc-400">
              Edit album and release information.
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
{/* Tracklist */}

<section>
  <h2 className="mb-5 border-b border-zinc-800 pb-3 text-xl font-semibold">
    Tracklist
  </h2>

  {tracks.length === 0 ? (
    <p className="text-sm text-zinc-500">
      No tracks available.
    </p>
  ) : (
    <div className="overflow-x-auto rounded border border-zinc-800">
      <table className="w-full text-sm">
        <thead className="bg-zinc-950">
          <tr className="border-b border-zinc-800 text-left">
            <th className="px-4 py-3">
              #
            </th>

            <th className="px-4 py-3">
              Track
            </th>

            <th className="px-4 py-3">
              Lyrics
            </th>
            <th className="px-4 py-3">
    Actions
  </th>
          </tr>
        </thead>

        <tbody>
         {tracks.map((track, index) => (
  <tr
    key={track.id_t}
    className="border-b border-zinc-800 last:border-0"
  >
    <td className="px-4 py-3 text-zinc-500 align-top">
      {index + 1}
    </td>

    {editingTrackId === track.id_t ? (
      <>
        <td className="px-4 py-3 align-top">
          <input
            type="text"
            value={editingTrackName}
            onChange={(event) =>
              setEditingTrackName(event.target.value)
            }
            className="w-full rounded border border-zinc-700 bg-zinc-950 px-3 py-2 text-sm text-white focus:border-red-600 focus:outline-none"
          />
        </td>

        <td className="px-4 py-3 align-top">
          <input
            type="text"
            value={editingTrackLyric}
            onChange={(event) =>
              setEditingTrackLyric(event.target.value)
            }
            className="w-full rounded border border-zinc-700 bg-zinc-950 px-3 py-2 text-sm text-white focus:border-red-600 focus:outline-none"
          />
        </td>

        <td className="px-4 py-3 align-top whitespace-nowrap">
          <button
            type="button"
            onClick={() =>
              handleSaveTrack(track.id_t)
            }
            disabled={savingTrackId === track.id_t}
            className="mr-2 rounded bg-red-600 px-3 py-1.5 text-xs font-semibold text-white hover:bg-red-500 disabled:cursor-not-allowed disabled:opacity-50"
          >
            {savingTrackId === track.id_t
              ? "Saving..."
              : "Save"}
          </button>

          <button
            type="button"
            onClick={cancelEditingTrack}
            disabled={savingTrackId === track.id_t}
            className="rounded border border-zinc-700 px-3 py-1.5 text-xs font-semibold text-zinc-300 hover:border-zinc-500 hover:text-white"
          >
            Cancel
          </button>
        </td>
      </>
    ) : (
      <>
        <td className="px-4 py-3 text-zinc-300 align-top">
          {track.name}
        </td>

        <td className="px-4 py-3 text-zinc-500 align-top">
          {track.lyric || "—"}
        </td>

        <td className="px-4 py-3 align-top whitespace-nowrap">
          <button
            type="button"
            onClick={() =>
              startEditingTrack(track)
            }
            className="mr-2 rounded border border-zinc-700 px-3 py-1.5 text-xs font-semibold text-zinc-300 hover:border-red-600 hover:text-red-500"
          >
            Edit
          </button>

          <button
            type="button"
            onClick={() =>
              handleDeleteTrack(track.id_t)
            }
            disabled={deletingTrackId === track.id_t}
            className="rounded border border-red-900 px-3 py-1.5 text-xs font-semibold text-red-400 hover:bg-red-950/40 disabled:cursor-not-allowed disabled:opacity-50"
          >
            {deletingTrackId === track.id_t
              ? "Deleting..."
              : "Delete"}
          </button>
        </td>
      </>
    )}
  </tr>
))}
                 </tbody>
      </table>
    </div>
  )}
  <div className="mt-6 border-t border-zinc-800 pt-6">

  <h3 className="mb-4 text-lg font-semibold">
    Add Track
  </h3>

  <div className="space-y-4">

    <div>
      <label className="mb-2 block text-sm font-semibold text-zinc-300">
        Track name
      </label>

      <input
        type="text"
        value={newTrackName}
        onChange={(event) =>
          setNewTrackName(event.target.value)
        }
        placeholder="e.g. 01. Track name"
        className="w-full rounded border border-zinc-700 bg-zinc-950 px-3 py-2 text-sm text-white placeholder:text-zinc-600 focus:border-red-600 focus:outline-none"
      />
    </div>

    <div>
      <label className="mb-2 block text-sm font-semibold text-zinc-300">
        Lyrics
      </label>

      <input
        type="text"
        value={newTrackLyric}
        onChange={(event) =>
          setNewTrackLyric(event.target.value)
        }
        placeholder="Optional"
        className="w-full rounded border border-zinc-700 bg-zinc-950 px-3 py-2 text-sm text-white placeholder:text-zinc-600 focus:border-red-600 focus:outline-none"
      />
    </div>

    {trackError && (
      <div className="rounded border border-red-900 bg-red-950/30 p-3 text-sm text-red-400">
        {trackError}
      </div>
    )}

    <button
      type="button"
      onClick={handleAddTrack}
      disabled={addingTrack}
      className="rounded bg-red-600 px-4 py-2 text-sm font-semibold text-white hover:bg-red-500 disabled:cursor-not-allowed disabled:opacity-50"
    >
      {addingTrack
        ? "Adding..."
        : "+ Add Track"}
    </button>

  </div>

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
                : "Save Changes"}
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