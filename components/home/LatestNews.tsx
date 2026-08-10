import Link from "next/link";

import type { NewsItem } from "@/lib/services/news";

type Props = {
  items: NewsItem[];
};

export default function LatestNews({
  items,
}: Props) {
  return (
    <section className="rounded-xl border border-zinc-800 bg-zinc-900 p-5">

      <div className="mb-3 flex items-center justify-between">

        <h2 className="text-xl font-bold text-red-500">
          Latest News & Updates
        </h2>

        <Link
          href="/news"
          className="text-sm text-zinc-400 transition hover:text-red-500"
        >
          Browse all →
        </Link>

      </div>

      <ul className="grid grid-cols-1 gap-x-6 md:grid-cols-2">

        {items.map((item) => (

          <li
            key={`${item.type}-${item.id}`}
            className="flex items-center justify-between border-b border-zinc-800 py-1.5"
          >

            <div className="flex min-w-0 items-center gap-2.5">

              <span
                className={
                  item.action === "new"
                    ? "h-2 w-2 shrink-0 rounded-full bg-red-500"
                    : "h-2 w-2 shrink-0 rounded-full bg-zinc-500"
                }
              />

              <Link
                href={
                  item.type === "musician"
                    ? `/persons?person=${item.id}`
                    : item.type === "album"
                      ? `/bands?band=${item.bandId}&album=${item.id}`
                      : `/?band=${item.id}`
                }
                className="truncate text-sm text-white transition hover:text-red-500"
              >
                {item.title}

                {item.subtitle && (
                  <span className="text-zinc-500">
                    {" "}
                    ({item.subtitle})
                  </span>
                )}

              </Link>

            </div>

            <span className="ml-4 shrink-0 text-[11px] text-zinc-600">
              {item.date.toLocaleDateString("cs-CZ")}
            </span>

          </li>

        ))}

      </ul>

    </section>
  );
}