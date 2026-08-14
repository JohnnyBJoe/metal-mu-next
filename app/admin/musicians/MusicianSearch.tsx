"use client";

import { useState } from "react";

type Props = {
  initialSearch: string;
};

export default function MusicianSearch({
  initialSearch,
}: Props) {
  const [search, setSearch] =
    useState(initialSearch);

  function handleSubmit(
    event: React.FormEvent<HTMLFormElement>
  ) {
    event.preventDefault();

    const value = search.trim();

    if (!value) {
      window.location.href =
        "/admin/musicians";
      return;
    }

    window.location.href =
      `/admin/musicians?search=${encodeURIComponent(value)}`;
  }

  return (
    <form
      onSubmit={handleSubmit}
      className="mb-6 flex gap-3"
    >
      <input
        type="search"
        value={search}
        onChange={(event) =>
          setSearch(event.target.value)
        }
        placeholder="Search musician name..."
        className="flex-1 rounded border border-zinc-700 bg-zinc-950 px-4 py-2 text-sm text-white placeholder:text-zinc-600 focus:border-red-600 focus:outline-none"
      />

      <button
        type="submit"
        className="rounded bg-red-600 px-5 py-2 text-sm font-semibold text-white hover:bg-red-500"
      >
        Search
      </button>

      {initialSearch && (
        <a
          href="/admin/musicians"
          className="rounded border border-zinc-700 px-5 py-2 text-sm text-zinc-400 hover:border-zinc-500 hover:text-white"
        >
          Clear
        </a>
      )}
    </form>
  );
}