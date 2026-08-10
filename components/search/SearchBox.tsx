"use client";

import Link from "next/link";
import { useEffect, useRef, useState } from "react";

type Band = {
  id_i: number;
  name: string;
};

type Person = {
  id_m: number;
  name: string;
  bandId: number;
  bandName: string | null;
};

type Album = {
  id_d: number;
  name: string;
  bandId: number;
  bandName: string | null;
  vydano: string | null;
};

type SearchResult = {
  bands: Band[];
  persons: Person[];
  albums: Album[];
};

export default function SearchBox() {
  const [query, setQuery] = useState("");
  const [debouncedQuery, setDebouncedQuery] = useState("");

  const [results, setResults] = useState<SearchResult>({
    bands: [],
    persons: [],
    albums: [],
  });

  const [selectedIndex, setSelectedIndex] = useState(-1);

  const wrapperRef = useRef<HTMLDivElement>(null);
  const itemRefs = useRef<(HTMLAnchorElement | null)[]>([]);

  // Debounce 300 ms
  useEffect(() => {
    const timer = setTimeout(() => {
      setDebouncedQuery(query);
    }, 300);

    return () => clearTimeout(timer);
  }, [query]);

  // Zavření kliknutím mimo + Esc
  useEffect(() => {
    function clearResults() {
      setResults({
        bands: [],
        persons: [],
        albums: [],
      });
    }

    function handleClickOutside(event: MouseEvent) {
      if (
        wrapperRef.current &&
        !wrapperRef.current.contains(event.target as Node)
      ) {
        clearResults();
      }
    }

    function handleKeyDown(event: KeyboardEvent) {
      if (event.key === "Escape") {
        clearResults();
      }
    }

    document.addEventListener("mousedown", handleClickOutside);
    document.addEventListener("keydown", handleKeyDown);

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
      document.removeEventListener("keydown", handleKeyDown);
    };
  }, []);

  // Vyhledávání
  useEffect(() => {
    if (debouncedQuery.trim().length < 2) {
      setResults({
        bands: [],
        persons: [],
        albums: [],
      });

      return;
    }

    async function search() {
      const response = await fetch(
        `/api/search?q=${encodeURIComponent(debouncedQuery)}`
      );

      const data = await response.json();

      setResults(data);
      setSelectedIndex(-1);
    }

    search();
  }, [debouncedQuery]);

  function closeResults() {
    setResults({
      bands: [],
      persons: [],
      albums: [],
    });
  }

  const hasResults =
    results.bands.length > 0 ||
    results.persons.length > 0 ||
    results.albums.length > 0;

  const allResults = [
    ...results.bands.map((band) => ({
      type: "band" as const,
      id: band.id_i,
    })),

    ...results.persons.map((person) => ({
      type: "person" as const,
      id: person.id_m,
    })),

    ...results.albums.map((album) => ({
      type: "album" as const,
      id: album.id_d,
    })),
  ];

  useEffect(() => {
    if (selectedIndex >= 0) {
      itemRefs.current[selectedIndex]?.scrollIntoView({
        block: "nearest",
      });
    }
  }, [selectedIndex]);

  function handleKeyDownInput(
    e: React.KeyboardEvent<HTMLInputElement>
  ) {
    if (!hasResults) {
      return;
    }

    if (e.key === "ArrowDown") {
      e.preventDefault();

      setSelectedIndex(
        (i) => (i + 1) % allResults.length
      );
    } else if (e.key === "ArrowUp") {
      e.preventDefault();

      setSelectedIndex(
        (i) =>
          i <= 0
            ? allResults.length - 1
            : i - 1
      );
    } else if (e.key === "Enter") {
      e.preventDefault();

      if (selectedIndex >= 0) {
        itemRefs.current[selectedIndex]?.click();
      }
    }
  }

  return (
    <div
      ref={wrapperRef}
      className="relative w-64"
    >

      <input
        type="text"
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        placeholder="Search..."
        onKeyDown={handleKeyDownInput}
        className="w-full rounded bg-zinc-900 px-3 py-2 text-sm text-white placeholder:text-zinc-500 focus:outline-none focus:ring-2 focus:ring-red-600"
      />

      {hasResults && (
        <div className="absolute left-0 right-0 z-50 mt-1 overflow-hidden rounded border border-zinc-700 bg-zinc-900 shadow-xl">

          {results.bands.map((band, index) => {

            const globalIndex = index;

            return (
              <Link
                key={`band-${band.id_i}`}
                ref={(el) => {
                  itemRefs.current[globalIndex] = el;
                }}
                href={`/bands?band=${band.id_i}`}
                onClick={closeResults}
                className={`flex items-center gap-3 px-3 py-2 transition-colors hover:bg-zinc-800 ${
                  selectedIndex === globalIndex
                    ? "bg-zinc-800"
                    : ""
                }`}
              >
                <span className="text-lg">
                  🎸
                </span>

                <span className="text-sm text-zinc-100">
                  {band.name}
                </span>
              </Link>
            );
          })}

          {results.persons.map((person, index) => {

            const globalIndex =
              results.bands.length + index;

            return (
              <Link
                key={`person-${person.id_m}`}
                ref={(el) => {
                  itemRefs.current[globalIndex] = el;
                }}
                href={`/persons?person=${person.id_m}`}
                onClick={closeResults}
                className={`flex items-start gap-3 px-3 py-2 transition-colors hover:bg-zinc-800 ${
                  selectedIndex === globalIndex
                    ? "bg-zinc-800"
                    : ""
                }`}
              >
                <span className="mt-0.5 text-lg">
                  👤
                </span>

                <div>
                  <div className="text-sm text-zinc-100">
                    {person.name}
                  </div>

                  {person.bandName && (
                    <div className="text-xs text-zinc-500">
                      {person.bandName}
                    </div>
                  )}
                </div>
              </Link>
            );
          })}

          {results.albums.map((album, index) => {

            const globalIndex =
              results.bands.length +
              results.persons.length +
              index;

            return (
              <Link
                key={`album-${album.id_d}`}
                ref={(el) => {
                  itemRefs.current[globalIndex] = el;
                }}
                href={`/bands?band=${album.bandId}&album=${album.id_d}`}
                onClick={closeResults}
                className={`flex items-start gap-3 px-3 py-2 transition-colors hover:bg-zinc-800 ${
                  selectedIndex === globalIndex
                    ? "bg-zinc-800"
                    : ""
                }`}
              >
                <span className="mt-0.5 text-lg">
                  💿
                </span>

                <div>
                  <div className="text-sm text-zinc-100">
                    {album.name}
                  </div>

                  {(album.bandName || album.vydano) && (
                    <div className="text-xs text-zinc-500">
                      {album.bandName}

                      {album.bandName &&
                        album.vydano &&
                        " · "}

                      {album.vydano}
                    </div>
                  )}
                </div>
              </Link>
            );
          })}

        </div>
      )}

    </div>
  );
}