"use client";

import { useState } from "react";

type Country = {
  id_c: number;
  text: string;
};

type Genre = {
  id_s: number;
  text: string;
};

type Band = {
  id_i: number;
  name: string;
  city: string;
  country: number;
  styles: string;
  homepage: string;
  info: string;
  biografie: string;
  foto: string;
  logo: string;
  date_start: string;
  date_end: string;
};

type Props = {
  band: Band;
  countries: Country[];
  genres: Genre[];
};

export default function EditBandForm({
  band,
  countries,
  genres,
}: Props) {
  const styleIds = band.styles
    .split(",")
    .map((id) => id.trim());

  const [name, setName] = useState(band.name);
  const [country, setCountry] = useState(
    String(band.country)
  );
  const [city, setCity] = useState(band.city);

  const [genre1, setGenre1] = useState(
    styleIds[0] || "0"
  );
  const [genre2, setGenre2] = useState(
    styleIds[1] || "0"
  );
  const [genre3, setGenre3] = useState(
    styleIds[2] || "0"
  );

  const [homepage, setHomepage] = useState(
    band.homepage
  );

  const [info, setInfo] = useState(band.info);
  const [biografie, setBiografie] = useState(
    band.biografie
  );

  const [foto, setFoto] = useState(band.foto);
  const [logo, setLogo] = useState(band.logo);

  const [dateStart, setDateStart] = useState(
    band.date_start
      ? band.date_start.slice(0, 4)
      : ""
  );

  const [dateEnd, setDateEnd] = useState(
    band.date_end
      ? band.date_end.slice(0, 4)
      : ""
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
        `/api/admin/bands/${band.id_i}`,
        {
          method: "PATCH",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            name,
            country,
            city,
            genre1,
            genre2,
            genre3,
            homepage,
            info,
            biografie,
            foto,
            logo,
            date_start: dateStart
              ? `${dateStart}-01-01`
              : "",
            date_end: dateEnd
              ? `${dateEnd}-01-01`
              : "",
          }),
        }
      );

      const data = await response.json();

      if (!response.ok) {
        setError(
          data.error ??
            "Failed to update band."
        );

        setSaving(false);
        return;
      }

      window.location.href = "/admin/bands";
    } catch {
      setError(
        "An unexpected error occurred."
      );

      setSaving(false);
    }
  }

  return (
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
              Band name
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
              Country
            </label>

            <select
              value={country}
              onChange={(event) =>
                setCountry(event.target.value)
              }
              required
              className="w-full rounded border border-zinc-700 bg-zinc-950 px-3 py-2 text-sm text-white focus:border-red-600 focus:outline-none"
            >
              {countries.map((item) => (
                <option
                  key={item.id_c}
                  value={item.id_c}
                >
                  {item.text}
                </option>
              ))}
            </select>
          </div>

          <div>
            <label className="mb-2 block text-sm font-semibold text-zinc-300">
              City
            </label>

            <input
              type="text"
              value={city}
              onChange={(event) =>
                setCity(event.target.value)
              }
              className="w-full rounded border border-zinc-700 bg-zinc-950 px-3 py-2 text-sm text-white focus:border-red-600 focus:outline-none"
            />
          </div>

          <div>
            <label className="mb-2 block text-sm font-semibold text-zinc-300">
              Genre 1
            </label>

            <select
              value={genre1}
              onChange={(event) =>
                setGenre1(event.target.value)
              }
              className="w-full rounded border border-zinc-700 bg-zinc-950 px-3 py-2 text-sm text-white focus:border-red-600 focus:outline-none"
            >
              <option value="0">—</option>

              {genres.map((item) => (
                <option
                  key={item.id_s}
                  value={item.id_s}
                >
                  {item.text}
                </option>
              ))}
            </select>
          </div>

          <div>
            <label className="mb-2 block text-sm font-semibold text-zinc-300">
              Genre 2
            </label>

            <select
              value={genre2}
              onChange={(event) =>
                setGenre2(event.target.value)
              }
              className="w-full rounded border border-zinc-700 bg-zinc-950 px-3 py-2 text-sm text-white focus:border-red-600 focus:outline-none"
            >
              <option value="0">—</option>

              {genres.map((item) => (
                <option
                  key={item.id_s}
                  value={item.id_s}
                >
                  {item.text}
                </option>
              ))}
            </select>
          </div>

          <div>
            <label className="mb-2 block text-sm font-semibold text-zinc-300">
              Genre 3
            </label>

            <select
              value={genre3}
              onChange={(event) =>
                setGenre3(event.target.value)
              }
              className="w-full rounded border border-zinc-700 bg-zinc-950 px-3 py-2 text-sm text-white focus:border-red-600 focus:outline-none"
            >
              <option value="0">—</option>

              {genres.map((item) => (
                <option
                  key={item.id_s}
                  value={item.id_s}
                >
                  {item.text}
                </option>
              ))}
            </select>
          </div>

        </div>
      </section>

      {/* Links */}

      <section>
        <h2 className="mb-5 border-b border-zinc-800 pb-3 text-xl font-semibold">
          Links
        </h2>

        <div>
          <label className="mb-2 block text-sm font-semibold text-zinc-300">
            Homepage
          </label>

          <input
            type="url"
            value={homepage}
            onChange={(event) =>
              setHomepage(event.target.value)
            }
            className="w-full rounded border border-zinc-700 bg-zinc-950 px-3 py-2 text-sm text-white focus:border-red-600 focus:outline-none"
          />
        </div>
      </section>

      {/* Information */}

      <section>
        <h2 className="mb-5 border-b border-zinc-800 pb-3 text-xl font-semibold">
          Information
        </h2>

        <div className="space-y-5">

          <div>
            <label className="mb-2 block text-sm font-semibold text-zinc-300">
              Latest information
            </label>

            <textarea
              value={info}
              onChange={(event) =>
                setInfo(event.target.value)
              }
              rows={6}
              className="w-full resize-y rounded border border-zinc-700 bg-zinc-950 px-3 py-2 text-sm text-white focus:border-red-600 focus:outline-none"
            />
          </div>

          <div>
            <label className="mb-2 block text-sm font-semibold text-zinc-300">
              Biography
            </label>

            <textarea
              value={biografie}
              onChange={(event) =>
                setBiografie(event.target.value)
              }
              rows={12}
              className="w-full resize-y rounded border border-zinc-700 bg-zinc-950 px-3 py-2 text-sm text-white focus:border-red-600 focus:outline-none"
            />

            <p className="mt-2 text-xs text-zinc-500">
              Existing HTML formatting is preserved.
            </p>
          </div>

        </div>
      </section>

      {/* Images */}

      <section>
        <h2 className="mb-5 border-b border-zinc-800 pb-3 text-xl font-semibold">
          Images
        </h2>

        <div className="space-y-5">

          <div>
            <label className="mb-2 block text-sm font-semibold text-zinc-300">
              Photo filename
            </label>

            <input
              type="text"
              value={foto}
              onChange={(event) =>
                setFoto(event.target.value)
              }
              className="w-full rounded border border-zinc-700 bg-zinc-950 px-3 py-2 text-sm text-white focus:border-red-600 focus:outline-none"
            />
          </div>

          <div>
            <label className="mb-2 block text-sm font-semibold text-zinc-300">
              Logo filename
            </label>

            <input
              type="text"
              value={logo}
              onChange={(event) =>
                setLogo(event.target.value)
              }
              className="w-full rounded border border-zinc-700 bg-zinc-950 px-3 py-2 text-sm text-white focus:border-red-600 focus:outline-none"
            />
          </div>

        </div>
      </section>

      {/* History */}

      <section>
        <h2 className="mb-5 border-b border-zinc-800 pb-3 text-xl font-semibold">
          History
        </h2>

        <div className="grid gap-5 md:grid-cols-2">

          <div>
            <label className="mb-2 block text-sm font-semibold text-zinc-300">
              Start year
            </label>

            <input
              type="number"
              min="1"
              max="9999"
              step="1"
              value={dateStart}
              onChange={(event) =>
                setDateStart(event.target.value)
              }
              placeholder="1973"
              className="w-full rounded border border-zinc-700 bg-zinc-950 px-3 py-2 text-sm text-white placeholder:text-zinc-600 focus:border-red-600 focus:outline-none"
            />

            <p className="mt-2 text-xs text-zinc-500">
              Enter the year only, for example 1973.
            </p>
          </div>

          <div>
            <label className="mb-2 block text-sm font-semibold text-zinc-300">
              End year
            </label>

            <input
              type="number"
              min="1"
              max="9999"
              step="1"
              value={dateEnd}
              onChange={(event) =>
                setDateEnd(event.target.value)
              }
              placeholder="1982"
              className="w-full rounded border border-zinc-700 bg-zinc-950 px-3 py-2 text-sm text-white placeholder:text-zinc-600 focus:border-red-600 focus:outline-none"
            />

            <p className="mt-2 text-xs text-zinc-500">
              Leave empty if the band is still active.
            </p>
          </div>

        </div>
      </section>

      {error && (
        <div className="rounded border border-red-900 bg-red-950/30 p-3 text-sm text-red-400">
          {error}
        </div>
      )}

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
          href="/admin/bands"
          className="text-sm text-zinc-400 hover:text-white"
        >
          Cancel
        </a>

      </div>

    </form>
  );
}